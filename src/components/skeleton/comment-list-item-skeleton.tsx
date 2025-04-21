import { Skeleton } from "../ui/skeleton";

const CommentListItemSkeleton = () => {
	return (
		<div className="relative bg-card px-4 py-4 rounded-2xl shadow border">
			<div className="flex items-center">
				<Skeleton className="w-[35px] h-[35px] object-cover rounded-full mr-2" />
				<Skeleton className="h-3 w-[30%]" />
			</div>
			<div className="pt-3 space-y-3">
				<Skeleton className="h-3" />
				<Skeleton className="h-3" />
				<Skeleton className="h-3 w-[30%]" />
				<div className="flex justify-between pt-4 items-center">
					<Skeleton className="text-xs h-3 w-[30%]" />
					<div className="flex space-x-4">
						<div className="flex text-xs items-center space-x-2">
							<Skeleton className="size-7" />
							<Skeleton className="h-3 w-10" />
						</div>
						<div className="flex text-xs items-center space-x-2">
							<Skeleton className="size-7" />
							<Skeleton className="h-3 w-10" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CommentListItemSkeleton;
