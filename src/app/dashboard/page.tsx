import BlogPostList from "@/components/blog-post-list";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

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
			<BlogPostList />
		</section>
	);
};
export default DashboardPage;
