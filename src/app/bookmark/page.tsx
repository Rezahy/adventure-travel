"use client";

import BlogPost from "@/components/blog-post";
import EmptyView from "@/components/empty-view";
import Heading from "@/components/heading";

import { AnimatePresence, motion } from "motion/react";

const BookmarkedPage = () => {
	const bookmarkedBlogPostList = Array.from({ length: 5 });
	return (
		<div className="sm:px-10 px-7 py-5 pb-10 ">
			<Heading>Bookmarked Posts</Heading>
			{bookmarkedBlogPostList.length > 0 ? (
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
					<AnimatePresence>
						{bookmarkedBlogPostList.map((_, index) => (
							<motion.div
								layout
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.25,
									delay: index / 10,
								}}
								exit={{ opacity: 0 }}
							>
								<BlogPost />
							</motion.div>
						))}
					</AnimatePresence>
				</section>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<EmptyView>Your Bookmarked News List is Empty</EmptyView>
				</motion.div>
			)}
		</div>
	);
};
export default BookmarkedPage;
