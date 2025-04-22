import { getAllPostsLocation } from "@/actions/postAction";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEFAULT_MAP_CENTER: [number, number] = [51.505, -0.09];
export const useMapCenter = (
	posts: Awaited<ReturnType<typeof getAllPostsLocation>>
) => {
	const [center, setCenter] = useState<[number, number] | null>(null);
	const searchParams = useSearchParams();
	useEffect(() => {
		if (searchParams.has("lat") && searchParams.has("lon")) {
			const lat = searchParams.get("lat");
			const lon = searchParams.get("lon");
			if (lat && lon && !isNaN(Number(lat)) && !isNaN(Number(lon))) {
				setCenter([Number(lat), Number(lon)]);
			}
		} else if (posts.length > 0) {
			const lastPublishedPost = posts[0];
			const lat = lastPublishedPost.latitude;
			const lon = lastPublishedPost.longitude;
			setCenter([lat, lon]);
		} else {
			setCenter(DEFAULT_MAP_CENTER);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return center;
};
