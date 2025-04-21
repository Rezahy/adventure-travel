"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getCarouselData = async () => {
	try {
		const postImages = await prisma.post.findMany({
			orderBy: {
				createdAt: "desc",
			},
			take: 3,
			select: {
				imageUrl: true,
			},
		});
		return postImages;
	} catch (error) {
		console.log("error on getCarouselData:", error);
		throw new Error("failed to get carousel data");
	}
};

export const getAllPosts = async () => {
	try {
		const posts = await prisma.post.findMany({
			orderBy: { createdAt: "desc" },
		});
		return posts;
	} catch (error) {
		console.log("error on getAllPosts: ", error);
		throw new Error("failed to get posts");
	}
};

export const getPostById = async (id: string) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id,
			},
			include: {
				likedBy: true,
			},
		});
		return post;
	} catch (error) {
		console.log("error on getPostById: ", error);
		throw new Error("failed to get post");
	}
};

export const getUserBookmarkedPosts = async (clerkId: string) => {
	try {
		const posts = await prisma.user.findMany({
			where: {
				clerkId,
			},
			select: {
				bookmarkedPosts: true,
			},
		});
		return posts;
	} catch (error) {
		console.log("error on getUserBookmarkedPosts:", error);
		throw new Error("failed to get user bookmarked posts");
	}
};

export const createPost = async (
	clerkId: string,
	title: string,
	content: string,
	imageUrl: string,
	latitude: number,
	longitude: number
) => {
	try {
		const post = await prisma.post.create({
			data: {
				title,
				content,
				imageUrl,
				author: {
					connect: {
						clerkId,
					},
				},
				location: {
					create: {
						longitude,
						latitude,
					},
				},
			},
		});
		revalidatePath("/", "layout");
		return post;
	} catch (error) {
		console.log("error on createPost: ", error);
		throw new Error("failed to create post");
	}
};

export const bookmarkPost = async (clerkId: string, postId: string) => {
	try {
		const post = await prisma.user.update({
			data: {
				bookmarkedPosts: { connect: { id: postId } },
			},
			where: { clerkId },
		});
		revalidatePath("/", "layout");
		return post;
	} catch (error) {
		console.log("error on bookmarkPost:", error);
		throw new Error("failed to bookmark post");
	}
};

export const unBookmarkPost = async (clerkId: string, postId: string) => {
	try {
		const post = await prisma.user.update({
			data: {
				bookmarkedPosts: {
					disconnect: {
						id: postId,
					},
				},
			},
			where: { clerkId },
		});
		revalidatePath("/", "layout");
		return post;
	} catch (error) {
		console.log("error on unBookmarkPost:", error);
		throw new Error("failed to un bookmark post");
	}
};

export const deletePostByAdmin = async (
	adminClerkId: string,
	postId: string
) => {
	try {
		const adminData = await prisma.user.findUnique({
			where: {
				clerkId: adminClerkId,
			},
		});
		if (adminData?.role === "ADMIN") {
			const deletedPost = await prisma.post.delete({ where: { id: postId } });
			revalidatePath("/", "layout");
			return deletedPost;
		}
	} catch (error) {
		console.log("error on deletePostByAdmin:", error);
		throw new Error("failed to delete post by admin");
	}
};
