import { Skeleton } from "../ui/skeleton";

const BlogBookmarkButtonSkeleton = () => {
	return (
		<Skeleton className="size-9 xl:scale-0 xl:opacity-0  absolute top-2 right-2  dark:bg-black/50  dark:hover:bg-black/75 group-hover:scale-100 group-hover:opacity-100 duration-300" />
	);
};
export default BlogBookmarkButtonSkeleton;
