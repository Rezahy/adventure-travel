import { Skeleton } from "../ui/skeleton";

const PostDetailsSkeleton = () => {
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<div className="h-[70vh]">
				<Skeleton className="w-full h-full rounded-xl shadow " />
			</div>
			<div className="py-4">
				<div className="flex justify-between">
					<Skeleton className="w-28 h-9" />
					<div className="flex space-x-4">
						<Skeleton className="w-21 h-9" />
						<Skeleton className="w-21 h-9" />
					</div>
				</div>
				<Skeleton className="w-[30%] h-7 my-6 mt-15" />
				<div className="space-y-4">
					{Array.from({ length: 20 }).map((_, index) => (
						<Skeleton key={index} className="h-3" />
					))}
					<Skeleton className="h-3 w-[60%]" />
				</div>
			</div>
			<footer className="py-4 flex justify-between items-center">
				<Skeleton className="w-[30%] h-2" />
				<div className="space-x-3 flex">
					<Skeleton className="w-19 h-9" />
					<Skeleton className="w-29 h-9" />
				</div>
			</footer>
		</section>
	);
};
export default PostDetailsSkeleton;
