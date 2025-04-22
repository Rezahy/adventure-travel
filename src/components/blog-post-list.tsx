import BlogPost from "./blog-post";
import { Post, User } from "@prisma/client";
type BlogPostListProps = {
	posts: (Post & { author: User })[];
};
const BlogPostList = ({ posts }: BlogPostListProps) => {
	return (
		<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
			{posts.map((post) => (
				<BlogPost key={post.id} post={post} />
			))}
		</section>
	);
};
export default BlogPostList;
