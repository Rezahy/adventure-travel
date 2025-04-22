"use client";

import { Loader } from "lucide-react";
import dynamic from "next/dynamic";

const LazyMarkAbleMap = dynamic(
	() => import("@/components/map/mark-able-map"),
	{
		ssr: false,
		loading: () => (
			<Loader className="animate-spin absolute left-1/2 -translate-x-1/2 top-1/2" />
		),
	}
);

export default LazyMarkAbleMap;
