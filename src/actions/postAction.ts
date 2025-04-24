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
				id: true,
				title: true,
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
			include: {
				author: true,
			},
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
				author: true,
				location: true,
			},
		});
		return post;
	} catch (error) {
		console.log("error on getPostById: ", error);
		throw new Error("failed to get post");
	}
};
export const getAllPostsLocation = async () => {
	try {
		const locations = await prisma.location.findMany({
			select: {
				latitude: true,
				longitude: true,
				post: {
					select: {
						id: true,
						imageUrl: true,
					},
				},
			},
			orderBy: {
				post: {
					createdAt: "desc",
				},
			},
		});
		return locations;
	} catch (error) {
		console.log("error on getAllPostsLocation: ", error);
		throw new Error("failed to get post");
	}
};
export const getUserPosts = async (clerkId: string) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				author: {
					clerkId,
				},
			},
			orderBy: { createdAt: "desc" },
			include: {
				author: true,
			},
		});
		return posts;
	} catch (error) {
		console.log("error on getUserPosts: ", error);
		throw new Error("failed to get user posts");
	}
};
export const getUserBookmarkedPosts = async (clerkId: string) => {
	try {
		const posts = await prisma.user.findUnique({
			where: {
				clerkId,
			},
			select: {
				bookmarkedPosts: {
					include: {
						author: true,
					},
				},
			},
		});
		return posts?.bookmarkedPosts;
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

export const deletePostByAuthor = async (
	authorClerkId: string,
	postId: string
) => {
	try {
		// await prisma.post.delete({ where: { id: postId } });
		await prisma.user.update({
			where: { clerkId: authorClerkId },
			data: {
				writtenPosts: {
					delete: {
						id: postId,
					},
				},
			},
		});
		revalidatePath("/", "layout");
	} catch (error) {
		console.log("error on deletePostByAdmin:", error);
		throw new Error("failed to delete post by admin");
	}
};

export const getProfileDataByUsername = async (username: string) => {
	try {
		const userData = await prisma.user.findUnique({
			where: {
				username,
			},
			select: {
				image_url: true,
				username: true,
			},
		});
		return userData;
	} catch (error) {
		console.log("error on getProfileDataByUsername: ", error);
		throw new Error("failed to get user profile");
	}
};

export const getPostsByUsername = async (username: string) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				author: {
					username,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			include: { author: true },
		});
		return posts;
	} catch (error) {
		console.log("error on getPostsByUsername: ", error);
		throw new Error("failed to get posts by username");
	}
};

export const getPublishedPostCountByUsername = async (username: string) => {
	try {
		const publishedPostsCount = await prisma.post.count({
			where: {
				author: {
					username,
				},
			},
		});
		return publishedPostsCount;
	} catch (error) {
		console.log("error on getAuthorPublishedPostCount: ", error);
		throw new Error("failed to get author published post count");
	}
};

export const getPostLikesCount = async (postId: string) => {
	try {
		const likes = await prisma.like.count({
			where: {
				postId,
			},
		});
		return likes;
	} catch (error) {
		console.log("error on getPostLikes: ", error);
		throw new Error("failed to get post likes");
	}
};

export const getPostCommentsCount = async (postId: string) => {
	try {
		const comments = await prisma.comment.count({
			where: {
				postId,
			},
		});
		return comments;
	} catch (error) {
		console.log("error on getPostCommentsCount: ", error);
		throw new Error("failed to get post comments count");
	}
};

export const likePost = async (clerkId: string, postId: string) => {
	try {
		const like = await prisma.like.create({
			data: {
				user: {
					connect: { clerkId },
				},
				post: {
					connect: {
						id: postId,
					},
				},
			},
		});
		revalidatePath("/post/[id]");
		return like;
	} catch (error) {
		console.log("error on likePost: ", error);
		throw new Error("failed to like post");
	}
};
export const deleteLikePost = async (clerkId: string, postId: string) => {
	try {
		const likeData = await prisma.like.findFirst({
			select: {
				id: true,
			},
			where: {
				user: {
					clerkId,
				},
				post: {
					id: postId,
				},
			},
		});
		if (likeData) {
			await prisma.like.delete({
				where: {
					id: likeData.id,
				},
			});
			revalidatePath("/post/[id]");
		}
	} catch (error) {
		console.log("error on deleteLikePost: ", error);
		throw new Error("failed to delete like post");
	}
};

export const isUserLikedPost = async (
	clerkId: string | null,
	postId: string
) => {
	try {
		if (clerkId) {
			const likedPostData = await prisma.user.findUnique({
				select: {
					likedPosts: true,
				},
				where: {
					clerkId,
				},
			});
			if (likedPostData) {
				return likedPostData.likedPosts.some((like) => like.postId === postId);
			}
		}

		return false;
	} catch (error) {
		console.log("error on isUserLikedPost: ", error);
		throw new Error("failed to get is user liked post");
	}
};
export const isUserBookmarkedPost = async (
	clerkId: string | null,
	postId: string
) => {
	try {
		if (clerkId) {
			const bookmarkedPost = await prisma.user.findUnique({
				where: {
					clerkId,
				},
				select: {
					bookmarkedPosts: true,
				},
			});
			if (bookmarkedPost) {
				return bookmarkedPost.bookmarkedPosts.some(
					(post) => post.id === postId
				);
			}
		}
		return false;
	} catch (error) {
		console.log("error on isUserBookmarkedPost: ", error);
		throw new Error("failed to get is user bookmarked post");
	}
};

export const editPostByAuthor = async (
	authorClerkId: string,
	postId: string,
	title: string,
	content: string,
	imageUrl: string,
	latitude: number,
	longitude: number
) => {
	try {
		await prisma.user.update({
			where: {
				clerkId: authorClerkId,
			},
			data: {
				writtenPosts: {
					update: {
						where: {
							id: postId,
						},
						data: {
							title,
							content,
							imageUrl,
							location: {
								update: {
									latitude,
									longitude,
								},
							},
						},
					},
				},
			},
		});
		revalidatePath("/", "layout");
	} catch (error) {
		console.log("error on editPostByAuthor: ", error);
		throw new Error("failed to edit post by author");
	}
};
export const editPostByAdmin = async (
	adminClerkId: string,
	postId: string,
	title: string,
	content: string,
	imageUrl: string,
	latitude: number,
	longitude: number
) => {
	try {
		const adminData = await prisma.user.findUnique({
			where: {
				clerkId: adminClerkId,
			},
		});
		if (adminData?.role === "ADMIN") {
			await prisma.post.update({
				where: {
					id: postId,
				},
				data: {
					title,
					content,
					imageUrl,
					location: {
						update: {
							latitude,
							longitude,
						},
					},
				},
			});
			revalidatePath("/", "layout");
		}
	} catch (error) {
		console.log("error on editPostByAdmin: ", error);
		throw new Error("failed to edit post by admin");
	}
};

export const searchPosts = async (query: string) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				OR: [
					{
						title: {
							contains: query,
							mode: "insensitive",
						},
					},
					{
						content: {
							mode: "insensitive",
							contains: query,
						},
					},
				],
			},
			include: {
				author: true,
			},
		});
		return posts;
	} catch (error) {
		console.log("error on searchPosts: ", error);
		throw new Error("failed to search posts");
	}
};
