"use client";

import { Share } from "lucide-react";
import { Button } from "./ui/button";

type SharePostButtonProps = {
	url: string;
	title: string;
	text: string;
};
const SharePostButton = ({ url, title, text }: SharePostButtonProps) => {
	return (
		<Button
			variant="outline"
			onClick={() =>
				window.navigator.share({
					url,
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
