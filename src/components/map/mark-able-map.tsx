/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";
import { PropsWithChildren, useEffect } from "react";
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
const DEFAULT_MAP_CENTER: [number, number] = [51.505, -0.09];
type MarkAbleMapProps = {
	center?: [number, number];
};
const MarkAbleMap = ({
	children,
	center = DEFAULT_MAP_CENTER,
}: PropsWithChildren<MarkAbleMapProps>) => {
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
			{children}
		</MapContainer>
	);
};
export default MarkAbleMap;
