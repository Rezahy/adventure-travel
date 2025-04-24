"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getUserBookmarkedPosts } from "@/actions/postAction";
import BlogBookmarkButton from "@/components/blog-bookmark-button";
import { Badge } from "@/components/ui/badge";
type BlogPostProps = {
	post: NonNullable<Awaited<ReturnType<typeof getUserBookmarkedPosts>>>[number];
	className?: string;
};
const BookmarkBlogPost = ({ className, post }: BlogPostProps) => {
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

				<BlogBookmarkButton isBookmarked={true} postId={post.id} />
			</div>
			<CardHeader>
				<CardDescription className="text-xs">
					<Badge variant="secondary">{post.createdAt.toDateString()}</Badge>
				</CardDescription>
				<CardTitle className="text-lg group-hover:underline cursor-pointer">
					<Link href={`/post/${post.id}`}>{post.title}</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<p className="line-clamp-3 text-justify">{post.content}</p>
			</CardContent>
			<CardFooter className="text-xs flex flex-col items-start">
				<p>
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
export default BookmarkBlogPost;
