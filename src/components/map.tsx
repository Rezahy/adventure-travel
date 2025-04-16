/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";
import PostPopup from "./post-popup";
import { useEffect } from "react";
import "leaflet-geosearch/assets/css/leaflet.css";

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

const Map = () => {
	return (
		<MapContainer
			className="absolute inset-0 z-0"
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom
		>
			<SearchField />

			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<Marker position={[51.505, -0.09]}>
				<Popup closeButton={false} className="m-0 p-0">
					<PostPopup />
				</Popup>
			</Marker>
		</MapContainer>
	);
};
export default Map;
