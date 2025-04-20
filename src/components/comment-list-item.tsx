import Image from "next/image";
import ImageAsset from "@/../public/image-asset.jpeg";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import {
	EllipsisVertical,
	LucideEdit,
	ThumbsDown,
	ThumbsUp,
	Trash,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const CommentListItem = () => {
	return (
		<div className="relative bg-card px-4 py-4 rounded-2xl shadow border">
			<div className="flex items-center">
				<Image
					src={ImageAsset}
					alt=""
					width={50}
					height={50}
					className="w-[35px] h-[35px] object-cover rounded-full mr-2"
				/>
				<span className="text-sm">username</span>
			</div>
			<div className="pt-3">
				<p className="text-base text-justify">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero nobis
					culpa minima illo accusantium inventore vero nesciunt distinctio nisi
					cumque. Necessitatibus maxime, provident exercitationem praesentium
					voluptas hic commodi dicta possimus!
				</p>
				<div className="flex justify-between pt-4 items-baseline">
					<span className="text-xs">
						{formatDistanceToNow(new Date(), {
							addSuffix: true,
						})}
					</span>
					<div className="flex space-x-4">
						<div className="flex text-xs items-center">
							<Button variant="ghost">
								<ThumbsUp />
							</Button>
							<span>1000</span>
						</div>
						<div className="flex text-xs items-center">
							<Button variant="ghost">
								<ThumbsDown />
							</Button>
							<span>20</span>
						</div>
					</div>
				</div>
			</div>
			<div className="absolute top-3 right-3">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">
							<EllipsisVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<LucideEdit />
							Edit
						</DropdownMenuItem>

						<DropdownMenuItem>
							<Trash />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};
export default CommentListItem;
