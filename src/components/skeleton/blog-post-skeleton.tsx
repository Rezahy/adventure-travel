import { Skeleton } from "../ui/skeleton";

const BlogPostSkeleton = () => {
	return (
		<div className="bg-card flex flex-col space-y-3 shadow border rounded-xl pb-6">
			<Skeleton className="h-[200px] rounded-none rounded-t-xl" />
			<div className="space-y-3 px-6">
				<Skeleton className="h-3 w-[30%]" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3 w-[60%] mt-6" />
			</div>
		</div>
	);
};
export default BlogPostSkeleton;
