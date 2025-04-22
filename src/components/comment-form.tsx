"use client";

import { FormEvent, useRef, useTransition } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { addComment } from "@/actions/commentAction";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const CommentForm = () => {
	const [isPending, startTransition] = useTransition();
	const { id } = useParams<{ id: string }>();
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const { userId: clerkId } = useAuth();
	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (textareaRef.current && textareaRef.current.value.trim().length > 0) {
			const message = textareaRef.current.value;
			if (clerkId) {
				startTransition(async () => {
					await addComment(clerkId, id, message);
					toast.success("comment added successfully");
					textareaRef.current!.value = "";
				});
			}
		}
	};
	return (
		<form className="space-y-4" onSubmit={onSubmitHandler}>
			<Textarea placeholder="Add your comment" ref={textareaRef} />
			<Button disabled={isPending}>
				{isPending ? <Loader className="animate-spin" /> : "Add Comment"}
			</Button>
		</form>
	);
};
export default CommentForm;
