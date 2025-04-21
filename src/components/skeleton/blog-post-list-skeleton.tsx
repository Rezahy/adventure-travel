import BlogPostSkeleton from "./blog-post-skeleton";

const BlogPostListSkeleton = () => {
	return (
		<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
			{Array.from({ length: 10 }).map((_, index) => (
				<BlogPostSkeleton key={index} />
			))}
		</section>
	);
};
export default BlogPostListSkeleton;
