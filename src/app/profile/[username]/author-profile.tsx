import { getProfileDataByUsername } from "@/actions/postAction";
import UserProfileSkeleton from "@/components/skeleton/user-profile-skeleton";
import Image from "next/image";
import { Suspense } from "react";

const AuthorProfile = ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	return (
		<Suspense fallback={<UserProfileSkeleton />}>
			<AuthorProfileSuspenseWrapper params={params} />
		</Suspense>
	);
};
export default AuthorProfile;

const AuthorProfileSuspenseWrapper = async ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	const { username } = await params;
	const profileData = await getProfileDataByUsername(username);
	return (
		<div className="flex flex-col items-center">
			{profileData?.image_url && (
				<Image
					src={profileData.image_url}
					alt="user-profile"
					width={140}
					height={140}
					className="rounded-full object-cover  w-35 h-35 shadow md:w-40 md:h-40"
				/>
			)}
			<h1 className="sm:text-xl md:text-2xl font-semibold py-3">
				{profileData?.username}
			</h1>
		</div>
	);
};
