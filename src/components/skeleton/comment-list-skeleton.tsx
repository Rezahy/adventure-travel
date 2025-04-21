import CommentListItemSkeleton from "./comment-list-item-skeleton";

const CommentListSkeleton = () => {
	return (
		<div className="gap-5 flex flex-col pt-5 pb-10">
			{Array.from({ length: 5 }).map((_, index) => (
				<CommentListItemSkeleton key={index} />
			))}
		</div>
	);
};
export default CommentListSkeleton;
