import { Suspense } from "react";
import SearchInput from "./search-input";
import BlogPostList from "@/components/blog-post-list";
import { searchPosts } from "@/actions/postAction";
import EmptyView from "@/components/empty-view";
import SearchBlogPostSkeleton from "@/components/skeleton/search-blog-post-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const SearchPage = async ({
	searchParams,
}: {
	searchParams?: Promise<{ q?: string }>;
}) => {
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<Suspense fallback={<Skeleton className="h-9 max-w-xl mx-auto" />}>
				<SearchInput />
			</Suspense>
			<Suspense fallback={<SearchBlogPostSkeleton />}>
				<SearchPostsSuspenseWrapper searchParams={searchParams} />
			</Suspense>
		</section>
	);
};
export default SearchPage;

const SearchPostsSuspenseWrapper = async ({
	searchParams,
}: {
	searchParams?: Promise<{ q?: string }>;
}) => {
	if (searchParams) {
		const q = (await searchParams).q;
		if (q && q.trim().length > 0) {
			const posts = await searchPosts(q);
			if (posts.length > 0) {
				return (
					<>
						<h1 className="text-2xl font-semibold py-7">Published Posts</h1>
						<BlogPostList posts={posts} />
					</>
				);
			} else {
				return <EmptyView>there is&apos;t any post with this search</EmptyView>;
			}
		}
	}
};
