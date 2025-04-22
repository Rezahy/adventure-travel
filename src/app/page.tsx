import { getAllPosts, getCarouselData } from "@/actions/postAction";
import BlogPostList from "@/components/blog-post-list";
import HomeCarousel from "@/components/home-carousel";
import BlogPostListSkeleton from "@/components/skeleton/blog-post-list-skeleton";
import HomeCarouselSkeleton from "@/components/skeleton/home-carousel-skeleton";
import { Suspense } from "react";

const HomePage = async () => {
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<Suspense fallback={<HomeCarouselSkeleton />}>
				<HomeCarouselSuspenseWrapper />
			</Suspense>
			<h1 className="text-2xl font-semibold py-7">Published Posts</h1>
			<Suspense fallback={<BlogPostListSkeleton />}>
				<BlogPostListSuspenseWrapper />
			</Suspense>
		</section>
	);
};
export default HomePage;

const HomeCarouselSuspenseWrapper = async () => {
	const carouselData = await getCarouselData();
	return <HomeCarousel images={carouselData} />;
};

const BlogPostListSuspenseWrapper = async () => {
	const publishedPost = await getAllPosts();
	return <BlogPostList posts={publishedPost} />;
};
