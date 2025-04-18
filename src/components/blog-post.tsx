import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import BlogBookmarkButton from "./blog-bookmark-button";
import ImageAsset from "@/../public/image-asset.jpeg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SquarePen, Trash } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

type BlogPostProps = {
	className?: string;
};
const BlogPost = ({ className }: BlogPostProps) => {
	return (
		<Card className={cn("gap-2 pt-0 group h-full", className)}>
			<div className="rounded-t-xl mb-2 shadow overflow-hidden h-[200px] relative">
				<Image
					src={ImageAsset}
					alt="image"
					width={500}
					height={500}
					className="h-full object-cover w-full group-hover:scale-115 transition-all duration-500"
				/>

				<BlogBookmarkButton />
			</div>
			<CardHeader>
				<CardDescription className="text-xs">
					<Badge variant="secondary">{new Date().toDateString()}</Badge>
				</CardDescription>
				<CardTitle className="text-lg group-hover:underline cursor-pointer">
					<Link href="#" target="_blank">
						Blog Title
					</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<p className="line-clamp-3">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
					ea maiores dolorum quam reprehenderit vitae, magnam natus provident
					error nobis.
				</p>
			</CardContent>
			<CardFooter className="text-xs flex flex-col items-start">
				<p>
					Written by
					<span className="hover:underline font-semibold cursor-pointer text-sm">
						@reza
					</span>
				</p>
				<div className="flex justify-end w-full space-x-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" asChild>
									<Link href="/post/edit/1">
										<SquarePen />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Edit Post</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon">
									<Trash />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Delete Post</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardFooter>
		</Card>
	);
};
export default BlogPost;
