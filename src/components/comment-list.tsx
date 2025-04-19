import CommentListItem from "./comment-list-item";

const CommentList = async () => {
	return (
		<div className="gap-5 flex flex-col pt-5 pb-10">
			{Array.from({ length: 5 }).map((_, index) => (
				<CommentListItem key={index} />
			))}
		</div>
	);
};
export default CommentList;

const CommentListEmptyView = () => {
	return (
		<div>
			<h4>there is no comment</h4>
		</div>
	);
};
