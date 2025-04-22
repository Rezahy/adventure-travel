"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { FormEvent, useRef, useState, useTransition } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Loader, LucideEdit } from "lucide-react";
import { Role } from "@prisma/client";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@clerk/nextjs";
import {
	updateCommentByAdmin,
	updateCommentByAuthor,
} from "@/actions/commentAction";
import { toast } from "sonner";

type CommentEditButtonProps = {
	commentId: string;
	userRole: Role;
	defaultMessage: string;
};

const CommentEditButton = ({
	commentId,
	userRole,
	defaultMessage,
}: CommentEditButtonProps) => {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						<LucideEdit />
						Edit
					</DropdownMenuItem>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit comment</DialogTitle>
						<DialogDescription>
							Edit comment here. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<EditCommentForm
						defaultCommentMessage={defaultMessage}
						commentId={commentId}
						userRole={userRole}
						setOpen={setOpen}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<LucideEdit />
					Edit
				</DropdownMenuItem>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Edit comment</DrawerTitle>
					<DrawerDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</DrawerDescription>
				</DrawerHeader>
				<EditCommentForm
					className="px-4"
					defaultCommentMessage={defaultMessage}
					userRole={userRole}
					commentId={commentId}
					setOpen={setOpen}
				/>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
export default CommentEditButton;

type EditCommentFormProps = {
	defaultCommentMessage: string;
	userRole: Role;
	commentId: string;
	setOpen: (open: boolean) => void;
};
function EditCommentForm({
	className,
	defaultCommentMessage,
	userRole,
	commentId,
	setOpen,
}: EditCommentFormProps & React.ComponentProps<"form">) {
	const { userId: clerkId } = useAuth();
	const [isPending, startTransition] = useTransition();
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (textareaRef.current) {
			const { value: editedMessage } = textareaRef.current;
			if (
				editedMessage.trim().length > 0 &&
				editedMessage != defaultCommentMessage
			) {
				startTransition(async () => {
					if (clerkId && userRole === "ADMIN") {
						await updateCommentByAdmin(clerkId, commentId, editedMessage);
					} else if (clerkId && userRole === "USER") {
						await updateCommentByAuthor(clerkId, commentId, editedMessage);
					}
					setOpen(false);
					toast.success("comment edited successfully");
				});
			}
		}
	};

	return (
		<form
			className={cn("grid items-start gap-4", className)}
			onSubmit={onSubmitHandler}
		>
			<div className="grid gap-2">
				<Label htmlFor="message">Comment</Label>
				<Textarea
					id="message"
					defaultValue={defaultCommentMessage}
					ref={textareaRef}
				/>
			</div>
			<Button type="submit" disabled={isPending}>
				{isPending ? <Loader className="animate-spin" /> : "Save changes"}
			</Button>
		</form>
	);
}
