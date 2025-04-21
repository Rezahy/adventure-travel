"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getPostComments = async (postId: string) => {
	try {
		const comments = await prisma.comment.findMany({
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
