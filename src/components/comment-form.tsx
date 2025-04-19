import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const CommentForm = () => {
	return (
		<form className="space-y-4">
			<Textarea placeholder="Add your comment" />
			<Button>Add Comment</Button>
		</form>
	);
};
export default CommentForm;
