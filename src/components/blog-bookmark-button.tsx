"use client";

import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const BlogBookmarkButton = () => {
	return (
		<Button
			className="xl:scale-0 xl:opacity-0 cursor-pointer absolute top-2 right-2  dark:bg-black/50  dark:hover:bg-black/75 group-hover:scale-100 group-hover:opacity-100 duration-300"
			variant="outline"
			size="icon"
		>
			<Bookmark
				className={cn("h-4 w-4", {
					"fill-primary text-primary": false,
				})}
			/>
		</Button>
	);
};
export default BlogBookmarkButton;
