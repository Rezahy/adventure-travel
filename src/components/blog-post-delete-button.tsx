"use client";

import { useAuth } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { useState, useTransition } from "react";
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
import { Loader, Trash } from "lucide-react";
import { toast } from "sonner";
import { deletePostByAdmin, deletePostByAuthor } from "@/actions/postAction";

type BlogPostDeleteButtonProps = {
	userRole: Role;
	postId: string;
};
const BlogPostDeleteButton = ({
	userRole,
	postId,
}: BlogPostDeleteButtonProps) => {
	const [open, setOpen] = useState(false);
	const { userId: clerkId } = useAuth();
	const [isPending, startTransition] = useTransition();
	const deleteCommentHandler = () => {
		startTransition(async () => {
			if (clerkId && userRole === "ADMIN") {
				await deletePostByAdmin(clerkId, postId);
			} else if (clerkId && userRole === "USER") {
				await deletePostByAuthor(clerkId, postId);
			}
			setOpen(false);
			toast.success("post deleted successfully");
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
						This action cannot be undone. This will permanently remove your post
						from our servers.
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
export default BlogPostDeleteButton;
