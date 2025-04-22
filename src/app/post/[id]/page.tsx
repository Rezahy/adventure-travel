import CommentForm from "@/components/comment-form";
import { Separator } from "@/components/ui/separator";
import CommentList from "@/components/comment-list";
import { getPostComments } from "@/actions/commentAction";
import { Suspense } from "react";
import CommentListSkeleton from "@/components/skeleton/comment-list-skeleton";
import { getPostById } from "@/actions/postAction";
import PostDetails from "./post-details";
import PostDetailsSkeleton from "@/components/skeleton/post-details-skeleton";
const PostDetailsPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	return (
		<>
			<Suspense fallback={<PostDetailsSkeleton />}>
				<PostDetailsSuspenseWrapper params={params} />
			</Suspense>
			<Separator />
			<div className="px-7 py-7 sm:px-10 max-w-2xl">
				<h2 className="text-xl sm:text-2xl md:text-3xl font-bold pb-3">
					Comments
				</h2>
				<CommentForm />
				<Suspense fallback={<CommentListSkeleton />}>
					<CommentListSuspenseWrapper params={params} />
				</Suspense>
			</div>
		</>
	);
};
export default PostDetailsPage;

const PostDetailsSuspenseWrapper = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const post = await getPostById(id);
	return <PostDetails params={params} post={post} />;
};

const CommentListSuspenseWrapper = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const comments = await getPostComments(id);
	return <CommentList comments={comments} />;
};
