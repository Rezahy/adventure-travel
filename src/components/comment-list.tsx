import { getPostComments } from "@/actions/commentAction";
import CommentListItem from "./comment-list-item";
type CommentListProps = {
	comments: Awaited<ReturnType<typeof getPostComments>>;
};
const CommentList = async ({ comments }: CommentListProps) => {
	return (
		<div className="gap-5 flex flex-col pt-5 pb-10">
			{comments.map((comment) => (
				<CommentListItem key={comment.id} comment={comment} />
			))}
		</div>
	);
};
export default CommentList;
