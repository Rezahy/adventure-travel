import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import BlogBookmarkButton from "./blog-bookmark-button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Post, User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { isUserBookmarkedPost } from "@/actions/postAction";
import { Suspense } from "react";
import BlogBookmarkButtonSkeleton from "./skeleton/blog-bookmark-button-skeleton";
import { Button } from "./ui/button";
import { EllipsisVertical, LucideEdit } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import BlogPostDeleteButton from "./blog-post-delete-button";
import { findUser } from "@/actions/userAction";

type BlogPostProps = {
	post: Post & { author: User };
	className?: string;
};
const BlogPost = async ({ className, post }: BlogPostProps) => {
	const { userId: clerkId } = await auth();
	let userData: User | null = null;
	if (clerkId) {
		userData = await findUser(clerkId);
	}
	return (
		<Card className={cn("gap-2 pt-0 group h-full", className)}>
			<div className="rounded-t-xl mb-2 shadow overflow-hidden h-[200px] relative">
				<Image
					src={post.imageUrl}
					alt={post.title}
					width={500}
					height={500}
					className="h-full object-cover w-full group-hover:scale-115 transition-all duration-500"
				/>

				<Suspense fallback={<BlogBookmarkButtonSkeleton />}>
					<BookmarkButtonSuspenseWrapper postId={post.id} />
				</Suspense>
			</div>
			<CardHeader>
				<CardDescription className="text-xs flex justify-between">
					<Badge variant="secondary">{post.createdAt.toDateString()}</Badge>
					{userData &&
						(userData.role === "ADMIN" ||
							userData.clerkId === post.author.clerkId) && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="relative left-4">
										<EllipsisVertical />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem asChild>
										<Link href={`/post/edit/${post.id}`}>
											<LucideEdit />
											Edit
										</Link>
									</DropdownMenuItem>
									<BlogPostDeleteButton
										userRole={userData?.role}
										postId={post.id}
									/>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
				</CardDescription>
				<CardTitle className="text-lg group-hover:underline cursor-pointer">
					<Link href={`/post/${post.id}`}>{post.title}</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<p className="line-clamp-3">{post.content}</p>
			</CardContent>
			<CardFooter className="text-xs flex flex-col items-start">
				<p className="italic">
					Written by
					<Link
						href={`/profile/${post.author.username}`}
						className="hover:underline font-semibold cursor-pointer text-sm"
					>
						@{post.author.username}
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};
export default BlogPost;

const BookmarkButtonSuspenseWrapper = async ({
	postId,
}: {
	postId: string;
}) => {
	const { userId: clerkId } = await auth();
	const isBookmarked = await isUserBookmarkedPost(clerkId, postId);
	return <BlogBookmarkButton isBookmarked={isBookmarked} postId={postId} />;
};
