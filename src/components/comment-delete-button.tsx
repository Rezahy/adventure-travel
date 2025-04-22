"use client";

import { Loader, Trash } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useState, useTransition } from "react";
import { Role } from "@prisma/client";
import {
	deleteCommentByAdmin,
	deleteCommentByAuthor,
} from "@/actions/commentAction";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
type CommentDeleteButtonProps = {
	commentId: string;
	userRole: Role;
};
const CommentDeleteButton = ({
	commentId,
	userRole,
}: CommentDeleteButtonProps) => {
	const [open, setOpen] = useState(false);
	const { userId: clerkId } = useAuth();
	const [isPending, startTransition] = useTransition();
	const deleteCommentHandler = () => {
		startTransition(async () => {
			if (clerkId && userRole === "ADMIN") {
				await deleteCommentByAdmin(clerkId, commentId);
			} else if (clerkId && userRole === "USER") {
				await deleteCommentByAuthor(clerkId, commentId);
			}
			setOpen(false);
			toast.success("comment deleted successfully");
		});
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<Trash />
					Delete
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently remove your
						comment from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isPending}
						onClick={(e) => {
							e.preventDefault();
							deleteCommentHandler();
						}}
					>
						{isPending ? <Loader className="animate-spin" /> : "Continue"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
export default CommentDeleteButton;
