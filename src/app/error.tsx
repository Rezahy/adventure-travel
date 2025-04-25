"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<section className="px-7 py-7 sm:px-10  flex flex-col items-center space-y-5">
			<h2 className="text-primary text-xl sm:text-3xl font-bold">
				Something went wrong!
			</h2>
			<Button variant="outline" onClick={() => reset()}>
				Try again
			</Button>
		</section>
	);
}
