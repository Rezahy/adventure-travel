"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/map"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

const MapPage = () => {
	return (
		<div>
			<LazyMap />
		</div>
	);
};
export default MapPage;
