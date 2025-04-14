import BlogPost from "./blog-post";

const BlogPostList = () => {
	return (
		<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
			{Array.from({ length: 5 }).map((post, index) => (
				<BlogPost key={index} />
			))}
		</section>
	);
};
export default BlogPostList;
