import Image from "next/image";
import ImageAsset from "@/../public/image-asset.jpeg";
import { formatDistanceToNow } from "date-fns";

const CommentListItem = () => {
	return (
		<div className="bg-card px-4 py-4 rounded-2xl shadow border">
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
				<p className="text-base">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero nobis
					culpa minima illo accusantium inventore vero nesciunt distinctio nisi
					cumque. Necessitatibus maxime, provident exercitationem praesentium
					voluptas hic commodi dicta possimus!
				</p>
				<div className="flex justify-between pt-4">
					<span className="text-xs">
						{formatDistanceToNow(new Date(), {
							addSuffix: true,
						})}
					</span>
					<div className="flex space-x-7">
						{/* <EditCommentButton
							userData={userData}
							commentId={comment.id}
							defaultCommentMessage={comment.message}
							commentClerkId={commentClerkId}
						/>
						<DeleteCommentButton
							userData={userData}
							commentId={comment.id}
							commentClerkId={commentClerkId}
						/> */}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CommentListItem;
