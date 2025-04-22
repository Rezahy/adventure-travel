"use client";

import { Share } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

type SharePostButtonProps = {
	title: string;
	text: string;
};
const SharePostButton = ({ title, text }: SharePostButtonProps) => {
	const pathname = usePathname();
	return (
		<Button
			variant="outline"
			onClick={() =>
				window.navigator.share({
					url: pathname,
					title,
					text,
				})
			}
		>
			<Share /> Share post
		</Button>
	);
};
export default SharePostButton;
