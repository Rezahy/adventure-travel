import { getPostById } from "@/actions/postAction";
import EditPost from "./edit-post";
import EmptyView from "@/components/empty-view";
import { findUser } from "@/actions/userAction";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

const EditPostPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const { userId: clerkId } = await auth();
	let userData: User | null = null;
	if (clerkId) {
		userData = await findUser(clerkId);
		const post = await getPostById(id);
		if (post && userData) {
			return (
				<EditPost
					postId={post.id}
					userRole={userData.role}
					defaultPostTitle={post.title}
					defaultPostContent={post.content}
					defaultPostImageUrl={post.imageUrl}
					defaultPostLocation={post.location!}
				/>
			);
		}
	}

	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<EmptyView>There isn&apos;t any post with this id!</EmptyView>
		</section>
	);
};
export default EditPostPage;
