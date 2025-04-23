"use client";

import { Loader, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import {
	deleteLikeComment,
	getPostComments,
	likeComment,
} from "@/actions/commentAction";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
type CommentLikeButtonProps = {
	comment: Awaited<ReturnType<typeof getPostComments>>[number];
	isLiked: boolean;
};
const CommentLikeButton = ({ comment, isLiked }: CommentLikeButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const { userId: clerkId, isSignedIn } = useAuth();
	const router = useRouter();
	const likeCommentHandler = () => {
		if (!isSignedIn && !clerkId) {
			router.push("/sign-up");
			return;
		}

		startTransition(() => {
			if (!isLiked) {
				likeComment(clerkId, comment.id);
			} else if (isLiked) {
				deleteLikeComment(clerkId, comment.id);
			}
		});
	};
	return (
		<div className="flex text-xs items-center">
			<Button variant="ghost" disabled={isPending} onClick={likeCommentHandler}>
				<ThumbsUp className={cn({ "fill-primary": isLiked })} />
			</Button>
			<span>
				{isPending ? (
					<Loader className="animate-spin" size={15} />
				) : (
					comment.likedBy.length
				)}
			</span>
		</div>
	);
};
export default CommentLikeButton;
