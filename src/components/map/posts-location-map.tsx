/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";
import PostPopup from "@/components/post-popup";
import { useEffect } from "react";
import "leaflet-geosearch/assets/css/leaflet.css";
import { getAllPostsLocation } from "@/actions/postAction";
import { useMapCenter } from "@/hooks/use-map-center";

const SearchField = () => {
	const provider = new OpenStreetMapProvider();

	//@ts-expect-error
	const searchControl = new SearchControl({
		notFoundMessage: "Sorry, that address could not be found.",
		provider: provider,
		style: "bar",
		showMarker: false,
	});

	const map = useMap();
	useEffect(() => {
		map.addControl(searchControl);
		return () => {
			map.removeControl(searchControl);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
};

type MapProps = {
	posts: Awaited<ReturnType<typeof getAllPostsLocation>>;
};
const Map = ({ posts }: MapProps) => {
	const center = useMapCenter(posts);
	if (center) {
		return (
			<MapContainer
				className="absolute inset-0 z-0"
				center={center}
				zoom={13}
				scrollWheelZoom
			>
				<SearchField />

				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{posts.map((post) => {
					return (
						<Marker
							key={post.post.id}
							position={[post.latitude, post.longitude]}
						>
							<Popup closeButton={false} className="m-0 p-0">
								<PostPopup post={post.post} />
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		);
	}
};
export default Map;
