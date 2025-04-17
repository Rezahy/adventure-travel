"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import Image from "next/image";

type ImageUploadProps = {
	onChange: (url: string) => void;
	value: string;
	endPoint: "postImage";
};
const ImageUpload = ({ endPoint, onChange, value }: ImageUploadProps) => {
	if (value) {
		return (
			<div className="relative size-40">
				<Image
					src={value}
					width={500}
					height={500}
					alt="upload"
					className="rounded-md size-40 object-cover"
				/>
				<Button
					variant="outline"
					size="icon"
					className="absolute top-0 right-0"
					onClick={() => {
						onChange("");
					}}
				>
					<XIcon />
				</Button>
			</div>
		);
	}
	return (
		<UploadDropzone
			className="py-8 ut-button:bg-primary ut-button:px-4 ut-button:py-2 ut-button:text-primary-foreground ut-button:shadow-xs  ut-button:ut-readying:bg-primary/50 ut-label:text-lg "
			endpoint={endPoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].ufsUrl);
			}}
			onUploadError={(error) => console.log(error)}
		/>
	);
};
export default ImageUpload;
