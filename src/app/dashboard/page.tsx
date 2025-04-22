import { getUserPosts } from "@/actions/postAction";
import AnimatedText from "@/components/animated-text";
import BlogPostList from "@/components/blog-post-list";
import EmptyView from "@/components/empty-view";
import BlogPostListSkeleton from "@/components/skeleton/blog-post-list-skeleton";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const DashboardPage = () => {
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<div className="flex justify-between items-baseline">
				<h1 className="text-2xl font-semibold py-7">Your Posts</h1>
				<Button variant="outline">
					<CirclePlus />
					<Link href="/post/add">Create Post</Link>
				</Button>
			</div>
			<Suspense fallback={<BlogPostListSkeleton />}>
				<UserPostsSuspenseWrapper />
			</Suspense>
		</section>
	);
};
export default DashboardPage;

const UserPostsSuspenseWrapper = async () => {
	const { userId: clerkId } = await auth();
	if (clerkId) {
		const posts = await getUserPosts(clerkId);
		if (posts.length > 0) {
			return <BlogPostList posts={posts} />;
		}
		return (
			<AnimatedText>
				<EmptyView>You don&apos;t have published post yet!</EmptyView>
			</AnimatedText>
		);
	}
};
