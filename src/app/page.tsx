import BlogPostList from "@/components/blog-post-list";
import HomeCarousel from "@/components/home-carousel";

const HomePage = () => {
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<HomeCarousel />
			<h1 className="text-2xl font-semibold py-7">Published Posts</h1>
			<BlogPostList />
		</section>
	);
};
export default HomePage;
