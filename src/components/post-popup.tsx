import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import ImageAsset from "@/../public/image-asset.jpeg";

const PostPopup = () => {
	return (
		<Link href="/">
			<Card className="shadow-none gap-0 border-0 p-0 m-0 group h-full overflow-hidden bg-white text-black min-w-[130px]">
				<div className="shadow overflow-hidden h-[100px] relative">
					<Image
						src={ImageAsset}
						alt="image"
						width={500}
						height={500}
						className="h-full object-cover w-full group-hover:scale-115 transition-all duration-500"
					/>
				</div>
				{/* <CardHeader className="p-0 m-0">
				<CardTitle className="text-xs group-hover:underline cursor-pointer">
					Blog Title
				</CardTitle>
			</CardHeader> */}
			</Card>
		</Link>
	);
};
export default PostPopup;
