"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getPostComments = async (postId: string) => {
	try {
		const comments = await prisma.comment.findMany({
			include: {
				user: true,
				likedBy: true,
				dislikedBy: true,
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

export const isUserLikeComment = async (
	clerkId: string | null,
	commentId: string
) => {
	try {
		if (clerkId) {
			const userLikedCommentsData = await prisma.user.findUnique({
				where: { clerkId },
				select: {
					commentLikes: true,
				},
			});
			if (userLikedCommentsData) {
				return userLikedCommentsData.commentLikes.some(
					(comment) => comment.commentId === commentId
				);
			}
		}

		return false;
	} catch (error) {
		console.log("error on isUserLikeComment: ", error);
		throw new Error("failed to get is user like comment");
	}
};

export const isUserDislikeComment = async (
	clerkId: string | null,
	commentId: string
) => {
	try {
		if (clerkId) {
			const userLikedCommentsData = await prisma.user.findUnique({
				where: { clerkId },
				select: {
					commentDislikes: true,
				},
			});
			if (userLikedCommentsData) {
				return userLikedCommentsData.commentDislikes.some(
					(comment) => comment.commentId === commentId
				);
			}
		}

		return false;
	} catch (error) {
		console.log("error on isUserDislikeComment: ", error);
		throw new Error("failed to get is user dislike comment");
	}
};

export const likeComment = async (clerkId: string, commentId: string) => {
	try {
		const isUserDisliked = await isUserDislikeComment(clerkId, commentId);
		if (isUserDisliked) {
			await deleteDislikeComment(clerkId, commentId);
		}
		await prisma.commentLike.create({
			data: {
				user: {
					connect: {
						clerkId,
					},
				},
				comment: {
					connect: {
						id: commentId,
					},
				},
			},
		});
		revalidatePath("/post/[id]");
	} catch (error) {
		console.log("error on likeComment:", error);
		throw new Error("failed to like a comment");
	}
};

export const deleteLikeComment = async (clerkId: string, commentId: string) => {
	try {
		const commentLikeData = await prisma.commentLike.findFirst({
			where: { commentId, user: { clerkId } },
			select: { id: true },
		});
		if (commentLikeData) {
			await prisma.commentLike.delete({ where: { id: commentLikeData.id } });
			revalidatePath("/post/[id]");
		}
	} catch (error) {
		console.log("error on likeComment:", error);
		throw new Error("failed to like a comment");
	}
};
export const dislikeComment = async (clerkId: string, commentId: string) => {
	try {
		const isUserLiked = await isUserLikeComment(clerkId, commentId);
		if (isUserLiked) {
			await deleteLikeComment(clerkId, commentId);
		}
		await prisma.commentDislike.create({
			data: {
				user: {
					connect: {
						clerkId,
					},
				},
				comment: {
					connect: {
						id: commentId,
					},
				},
			},
		});
		revalidatePath("/post/[id]");
	} catch (error) {
		console.log("error on dislikeComment:", error);
		throw new Error("failed to dislike a comment");
	}
};

export const deleteDislikeComment = async (
	clerkId: string,
	commentId: string
) => {
	try {
		const commentDislikeData = await prisma.commentDislike.findFirst({
			where: { commentId, user: { clerkId } },
			select: { id: true },
		});
		if (commentDislikeData) {
			await prisma.commentDislike.delete({ where: { id: commentDislikeData.id } });
			revalidatePath("/post/[id]");
		}
	} catch (error) {
		console.log("error on deleteDislikeComment:", error);
		throw new Error("failed to delete dislike a comment");
	}
};
