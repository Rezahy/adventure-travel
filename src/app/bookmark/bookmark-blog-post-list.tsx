"use client";

import { getUserBookmarkedPosts } from "@/actions/postAction";
import EmptyView from "@/components/empty-view";
import { AnimatePresence, motion } from "motion/react";
import BookmarkBlogPost from "./bookmark-blog-post";

type BookmarkBlogPostListProps = {
	posts: Awaited<ReturnType<typeof getUserBookmarkedPosts>>;
};
const BookmarkBlogPostList = ({ posts }: BookmarkBlogPostListProps) => {
	if (posts) {
		if (posts.length > 0) {
			return (
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
					<AnimatePresence>
						{posts.map((post, index) => (
							<motion.div
								layout
								key={post.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.25,
									delay: index / 10,
								}}
								exit={{ opacity: 0 }}
							>
								<BookmarkBlogPost post={post} />
							</motion.div>
						))}
					</AnimatePresence>
				</section>
			);
		}
		return <BookmarkBlogPostEmptyView />;
	}
	return <BookmarkBlogPostEmptyView />;
};
export default BookmarkBlogPostList;

const BookmarkBlogPostEmptyView = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<EmptyView>You didn&apos;t bookmark any post yet!</EmptyView>
		</motion.div>
	);
};
