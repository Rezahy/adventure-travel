import Image from "next/image";
import ImageAsset from "@/../public/image-asset.jpeg";
import { Badge } from "@/components/ui/badge";
import BlogPostList from "@/components/blog-post-list";

const UserProfilePage = async ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	const { username } = await params;
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<div className="flex flex-col items-center">
				<Image
					src={ImageAsset}
					alt="user-profile"
					className="rounded-full object-cover  w-35 h-35 shadow md:w-40 md:h-40"
				></Image>
				<h1 className="sm:text-xl md:text-2xl font-semibold py-3">
					{username}
				</h1>
			</div>
			<div className="flex items-center space-x-3">
				<h1 className="text-lg sm:text-xl md:text-2xl font-semibold py-7">
					Published Posts
				</h1>
				<Badge className="bg-[#B8336A] text-white shadow">11</Badge>
			</div>
			<BlogPostList />
		</section>
	);
};
export default UserProfilePage;
