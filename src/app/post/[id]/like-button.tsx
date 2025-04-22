"use client";

import { deleteLikePost, likePost } from "@/actions/postAction";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart, Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";

type LikeButtonProps = {
	isLiked: boolean;
	likeCount: number;
};
const LikeButton = ({ isLiked, likeCount }: LikeButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const { userId: clerkId, isSignedIn } = useAuth();
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const onClickHandler = () => {
		if (!isSignedIn && !clerkId) {
			router.push("/sign-up");
			return;
		}
		startTransition(async () => {
			if (isLiked) {
				await deleteLikePost(clerkId, id);
			} else {
				await likePost(clerkId, id);
			}
		});
	};
	return (
		<Button
			disabled={isPending}
			variant="outline"
			className={cn({
				"border-[#B8336A] text-[#B8336A] hover:text-[#B8336A]": isLiked,
			})}
			onClick={onClickHandler}
		>
			<Heart className={cn({ "fill-[#B8336A] text-[#B8336A]": isLiked })} />
			{isPending ? <Loader className="animate-spin" /> : likeCount}
		</Button>
	);
};
export default LikeButton;
