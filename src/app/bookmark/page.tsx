import Heading from "@/components/heading";
import BookmarkBlogPostList from "./bookmark-blog-post-list";
import { getUserBookmarkedPosts } from "@/actions/postAction";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import BlogPostListSkeleton from "@/components/skeleton/blog-post-list-skeleton";

const BookmarkedPage = () => {
	return (
		<div className="sm:px-10 px-7 py-5 pb-10 ">
			<Heading>Bookmarked Posts</Heading>
			<Suspense fallback={<BlogPostListSkeleton />}>
				<BookmarkBlogPostListSuspenseWrapper />
			</Suspense>
		</div>
	);
};
export default BookmarkedPage;

const BookmarkBlogPostListSuspenseWrapper = async () => {
	const { userId: clerkId } = await auth();
	if (clerkId) {
		const posts = await getUserBookmarkedPosts(clerkId);
		return <BookmarkBlogPostList posts={posts} />;
	}
};
