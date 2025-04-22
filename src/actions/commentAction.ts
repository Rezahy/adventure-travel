"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getPostComments = async (postId: string) => {
	try {
		const comments = await prisma.comment.findMany({
			include: {
				user: true,
			},
			where: {
				postId,
			},
		});
		return comments;
	} catch (error) {
		console.log("error on getPostComments", error);
		throw new Error("failed to get comments");
	}
};

export const addComment = async (
	clerkId: string,
	postId: string,
	message: string
) => {
	try {
		const comment = await prisma.comment.create({
			data: {
				message,
				user: {
					connect: {
						clerkId,
					},
				},
				post: {
					connect: {
						id: postId,
					},
				},
			},
		});
		revalidatePath("/post/[id]");
		return comment;
	} catch (error) {
		console.log("error on addComment: ", error);
		throw new Error("failed to add comment");
	}
};

export const deleteCommentByAdmin = async (
	adminClerkId: string,
	commentId: string
) => {
	try {
		const adminData = await prisma.user.findUnique({
			where: {
				clerkId: adminClerkId,
			},
		});
		if (adminData?.role === "ADMIN") {
			const deletedComment = await prisma.comment.delete({
				where: { id: commentId },
			});
			revalidatePath("/post/[id]");
			return deletedComment;
		}
	} catch (error) {
		console.log("error on deleteCommentByAdmin:", error);
		throw new Error("failed to delete comment by admin");
	}
};

export const deleteCommentByAuthor = async (
	authorClerkId: string,
	commentId: string
) => {
	try {
		await prisma.user.update({
			where: { clerkId: authorClerkId },
			data: {
				comments: {
					delete: { id: commentId },
				},
			},
		});
		revalidatePath("/post/[id]");
	} catch (error) {
		console.log("error on deleteCommentByAuthor: ", error);
		throw new Error("Failed to delete comment");
	}
};

export const updateCommentByAuthor = async (
	authorClerkId: string,
	commentId: string,
	newMessage: string
) => {
	try {
		await prisma.user.update({
			where: { clerkId: authorClerkId },
			data: {
				comments: {
					update: {
						where: {
							id: commentId,
						},
						data: {
							message: newMessage,
						},
					},
				},
			},
		});
		revalidatePath("/post/[id]");
	} catch (error) {
		console.log("error on updateCommentByAuthor: ", error);
		throw new Error("Failed to update comment");
	}
};
export const updateCommentByAdmin = async (
	adminClerkId: string,
	commentId: string,
	newMessage: string
) => {
	try {
		const adminData = await prisma.user.findUnique({
			where: { clerkId: adminClerkId },
		});
		if (adminData?.role === "ADMIN") {
			await prisma.comment.update({
				where: { id: commentId },
				data: {
					message: newMessage,
				},
			});
			revalidatePath("/[id]", "page");
		}
	} catch (error) {
		console.log("error on updateCommentByAdmin: ", error);
		throw new Error("Failed to update comment");
	}
};
