import { getAllPostsLocation } from "@/actions/postAction";
import LazyPostsLocationMap from "@/components/map/lazy-posts-location-map";

const MapPage = async () => {
	const posts = await getAllPostsLocation();
	return (
		<div>
			<LazyPostsLocationMap posts={posts} />
		</div>
	);
};
export default MapPage;
