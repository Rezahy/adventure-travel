import { Skeleton } from "../ui/skeleton";

const UserProfileSkeleton = () => {
	return (
		<div className="flex flex-col items-center">
			<Skeleton className="rounded-full object-cover  w-35 h-35 shadow md:w-40 md:h-40" />
			<Skeleton className="h-4 w-[200px] mt-5" />
		</div>
	);
};
export default UserProfileSkeleton;
