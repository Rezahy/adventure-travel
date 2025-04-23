import {
	getPostById,
	getPostCommentsCount,
	getPostLikesCount,
	isUserBookmarkedPost,
	isUserLikedPost,
} from "@/actions/postAction";
import BlogBookmarkButton from "@/components/blog-bookmark-button";
import SharePostButton from "@/components/share-post-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import LikeButton from "./like-button";
import { MapPin, MessageSquare } from "lucide-react";
import BlogBookmarkButtonSkeleton from "@/components/skeleton/blog-bookmark-button-skeleton";

type PostDetailsProps = {
	post: Awaited<ReturnType<typeof getPostById>>;
	params: Promise<{ id: string }>;
};
const PostDetails = async ({ post, params }: PostDetailsProps) => {
	if (post) {
		return (
			<section className="px-7 py-7 sm:px-10 pb-10">
				<div className="shadow overflow-hidden h-[70vh] relative rounded-xl group">
					<Image
						src={post.imageUrl}
						alt="post"
						width={500}
						height={500}
						className="w-full h-full object-cover group-hover:scale-115 transition-all duration-500"
					/>

					<Suspense fallback={<BlogBookmarkButtonSkeleton />}>
						<BookmarkButtonSuspenseWrapper params={params} />
					</Suspense>
				</div>
				<div className="py-4">
					<div className="flex justify-between">
						<Badge variant="secondary" className="text-xs">
							{post.updatedAt.toDateString()}
						</Badge>
						<div className="flex space-x-4 text-sm">
							<Suspense fallback={<Skeleton className="w-21 h-9" />}>
								<LikePostCountSuspenseWrapper params={params} />
							</Suspense>
							<Suspense fallback={<Skeleton className="w-21 h-9" />}>
								<CommentPostCountSuspenseWrapper params={params} />
							</Suspense>
						</div>
					</div>
					<h2 className="text-xl sm:text-2xl md:text-3xl font-bold py-6 pt-15">
						{post.title}
					</h2>
					<p className="whitespace-pre-wrap text-justify leading-8 text-base md:text-lg text-gray-700 dark:text-gray-300">
						{post.content}
					</p>
				</div>
				<footer className="py-4 flex justify-between items-center">
					<div>
						<p className="italic">
							Written by
							<Link
								href={`/profile/${post.author.username}`}
								className="hover:underline font-semibold cursor-pointer text-sm"
							>
								@{post.author.username}
							</Link>
						</p>
					</div>
					<div className="space-x-3">
						<Button variant="outline" asChild>
							<Link
								href={`/map?lat=${post.location?.latitude}&lon=${post.location?.longitude}`}
							>
								<MapPin />
								Map
							</Link>
						</Button>
						<SharePostButton title={post.title} text={post.content} />
					</div>
				</footer>
			</section>
		);
	}
};

export default PostDetails;

const LikePostCountSuspenseWrapper = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const { userId: clerkId } = await auth();
	const likeCount = await getPostLikesCount(id);
	const isLiked = await isUserLikedPost(clerkId, id);
	return <LikeButton isLiked={isLiked} likeCount={likeCount} />;
};
const CommentPostCountSuspenseWrapper = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const commentCount = await getPostCommentsCount(id);
	return (
		<Button variant="outline" asChild>
			<Link href="#comments">
				<MessageSquare />
				{commentCount}
			</Link>
		</Button>
	);
};

const BookmarkButtonSuspenseWrapper = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const { userId: clerkId } = await auth();
	const isBookmarked = await isUserBookmarkedPost(clerkId, id);
	return <BlogBookmarkButton isBookmarked={isBookmarked} postId={id} />;
};
