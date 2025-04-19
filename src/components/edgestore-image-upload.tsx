"use client";

import { SingleImageDropzone } from "@/components/upload/single-image";
import {
	UploaderProvider,
	type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
type EdgeStoreSingleImageUploadProps = {
	onChange: (url: string) => void;
	value: string;
};
export function EdgeStoreSingleImageUpload({
	onChange,
	value,
}: EdgeStoreSingleImageUploadProps) {
	const { edgestore } = useEdgeStore();

	const uploadFn: UploadFn = React.useCallback(
		async ({ file, onProgressChange, signal }) => {
			const res = await edgestore.publicFiles.upload({
				file,
				signal,
				onProgressChange,
			});
			// you can run some server action or api here
			// to add the necessary data to your database
			console.log(res);
			return res;
		},
		[edgestore]
	);

	if (value) {
		return (
			<div className="relative size-50">
				<img
					className="h-full w-full rounded-md object-cover"
					src={value}
					alt={"uploaded image"}
				/>

				<Button
					variant="secondary"
					size="sm"
					className="size-6 shadow-2xl absolute top-1 right-1 [&_svg]:size-3.5 rounded-full"
					onClick={() => {
						onChange("");
					}}
				>
					<XIcon className="size-4" />
				</Button>
			</div>
		);
	}

	return (
		<UploaderProvider
			uploadFn={uploadFn}
			autoUpload
			onUploadCompleted={(file) => {
				// console.log(file.url);
				onChange(file.url);
			}}
		>
			<SingleImageDropzone
				height={200}
				width={200}
				dropzoneOptions={{
					maxSize: 1024 * 1024 * 1, // 1 MB
				}}
			/>
		</UploaderProvider>
	);
}
