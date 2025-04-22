import { Badge } from "@/components/ui/badge";
import AuthorProfile from "./author-profile";
import {
	getPublishedPostCountByUsername,
	getPostsByUsername,
} from "@/actions/postAction";
import BlogPostList from "@/components/blog-post-list";
import { Suspense } from "react";
import BlogPostListSkeleton from "@/components/skeleton/blog-post-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { findUserByUsername } from "@/actions/userAction";
import EmptyView from "@/components/empty-view";

const UserProfilePage = async ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	const { username } = await params;
	const user = await findUserByUsername(username);
	if (!user) {
		return <EmptyView>There is&apos;t any user with this username</EmptyView>;
	}
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<AuthorProfile params={params} />
			<div className="flex items-center space-x-3">
				<h1 className="text-lg sm:text-xl md:text-2xl font-semibold py-7">
					Published Posts
				</h1>
				<Suspense fallback={<Skeleton className="size-3" />}>
					<BadgePostListSuspenseWrapper params={params} />
				</Suspense>
			</div>
			<Suspense fallback={<BlogPostListSkeleton />}>
				<BlogPostListSuspenseWrapper params={params} />
			</Suspense>
		</section>
	);
};
export default UserProfilePage;

const BlogPostListSuspenseWrapper = async ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	const { username } = await params;
	const posts = await getPostsByUsername(username);
	return <BlogPostList posts={posts} />;
};

const BadgePostListSuspenseWrapper = async ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	const { username } = await params;
	const publishedPostCount = await getPublishedPostCountByUsername(username);
	return (
		<Badge className="bg-[#B8336A] text-white shadow">
			{publishedPostCount}
		</Badge>
	);
};
