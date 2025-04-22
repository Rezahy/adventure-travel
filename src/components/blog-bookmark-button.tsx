"use client";

import { Bookmark, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { bookmarkPost, unBookmarkPost } from "@/actions/postAction";
type BlogBookmarkButtonProps = {
	isBookmarked: boolean;
	postId: string;
};
const BlogBookmarkButton = ({
	isBookmarked,
	postId,
}: BlogBookmarkButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const { userId: clerkId, isSignedIn } = useAuth();
	const router = useRouter();
	const onClickHandler = () => {
		if (!isSignedIn && !clerkId) {
			router.push("/sign-up");
			return;
		}
		startTransition(async () => {
			if (isBookmarked) {
				await unBookmarkPost(clerkId, postId);
			} else {
				await bookmarkPost(clerkId, postId);
			}
		});
	};
	return (
		<Button
			className="xl:scale-0 xl:opacity-0 cursor-pointer absolute top-2 right-2  dark:bg-black/50  dark:hover:bg-black/75 group-hover:scale-100 group-hover:opacity-100 duration-300"
			variant="outline"
			size="icon"
			onClick={onClickHandler}
			disabled={isPending}
		>
			{isPending ? (
				<Loader className="animate-spin" />
			) : (
				<Bookmark
					className={cn("h-4 w-4", {
						"fill-primary text-primary": isBookmarked,
					})}
				/>
			)}
		</Button>
	);
};
export default BlogBookmarkButton;
