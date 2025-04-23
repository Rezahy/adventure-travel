import { Skeleton } from "../ui/skeleton";
import BlogPostListSkeleton from "./blog-post-list-skeleton";

const SearchBlogPostSkeleton = () => {
	return (
		<div>
			<Skeleton className="h-10 w-50 my-7" />
			<BlogPostListSkeleton />
		</div>
	);
};
export default SearchBlogPostSkeleton;
