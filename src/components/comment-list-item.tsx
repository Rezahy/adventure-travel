import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { EllipsisVertical, ThumbsDown, ThumbsUp } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getPostComments } from "@/actions/commentAction";
import CommentDeleteButton from "./comment-delete-button";
import { findUser } from "@/actions/userAction";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import CommentEditButton from "./comment-edit-button";
type CommentListItemProps = {
	comment: Awaited<ReturnType<typeof getPostComments>>[number];
};
const CommentListItem = async ({ comment }: CommentListItemProps) => {
	const { userId: clerkId } = await auth();
	let userData: User | null = null;
	if (clerkId) {
		userData = await findUser(clerkId);
	}
	return (
		<div className="relative bg-card px-4 py-4 rounded-2xl shadow border">
			<div className="flex items-center">
				{comment.user.image_url && (
					<Image
						src={comment.user.image_url}
						alt=""
						width={50}
						height={50}
						className="w-[35px] h-[35px] object-cover rounded-full mr-2"
					/>
				)}
				<span className="text-sm">{comment.user.username}</span>
			</div>
			<div className="pt-3">
				<p className="text-base text-justify whitespace-pre-wrap">
					{comment.message}
				</p>
				<div className="flex justify-between pt-4 items-baseline">
					<span className="text-xs">
						{formatDistanceToNow(comment.updateAt, {
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
			{userData &&
				(userData.role === "ADMIN" ||
					userData.clerkId === comment.user.clerkId) && (
					<div className="absolute top-3 right-3">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost">
									<EllipsisVertical />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<CommentEditButton
									userRole={userData.role}
									commentId={comment.id}
									defaultMessage={comment.message}
								/>
								<CommentDeleteButton
									userRole={userData.role}
									commentId={comment.id}
								/>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
		</div>
	);
};
export default CommentListItem;
