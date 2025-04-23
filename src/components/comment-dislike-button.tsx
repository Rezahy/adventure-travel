"use client";

import { Loader, ThumbsDown } from "lucide-react";
import { Button } from "./ui/button";
import {
	deleteDislikeComment,
	dislikeComment,
	getPostComments,
} from "@/actions/commentAction";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
type CommentLikeButtonProps = {
	comment: Awaited<ReturnType<typeof getPostComments>>[number];
	isDisliked: boolean;
};
const CommentDislikeButton = ({
	comment,
	isDisliked,
}: CommentLikeButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const { userId: clerkId, isSignedIn } = useAuth();
	const router = useRouter();
	const dislikeCommentHandler = () => {
		if (!isSignedIn && !clerkId) {
			router.push("/sign-up");
			return;
		}
		startTransition(() => {
			if (!isDisliked) {
				dislikeComment(clerkId, comment.id);
			} else if (isDisliked) {
				deleteDislikeComment(clerkId, comment.id);
			}
		});
	};
	return (
		<div className="flex text-xs items-center">
			<Button
				variant="ghost"
				disabled={isPending}
				onClick={dislikeCommentHandler}
			>
				<ThumbsDown className={cn({ "fill-primary": isDisliked })} />
			</Button>
			<span>
				{isPending ? (
					<Loader className="animate-spin" size={15} />
				) : (
					comment.dislikedBy.length
				)}
			</span>
		</div>
	);
};
export default CommentDislikeButton;
