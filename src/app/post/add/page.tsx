"use client";

import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import ImageUpload from "@/components/image-upload";
import { useState } from "react";

const AddPost = () => {
	const [imageUrl, setImageUrl] = useState("");
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle>Create new post</CardTitle>
					<CardDescription>Make your new post.</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="title">Title</Label>
								<Input id="title" placeholder="Title of your post" />
								<Label htmlFor="content">Content</Label>
								<Textarea
									id="content"
									placeholder="Content of your post"
									className="min-h-[100px]"
								/>
								<div className="border rounded-lg p-4">
									<ImageUpload
										endPoint="postImage"
										value={imageUrl}
										onChange={(url) => {
											setImageUrl(url);
										}}
									/>
								</div>
								{/* <UploadButton
									config={{ cn: twMerge }}
									className="text-primary"
									endpoint="imageUploader"
									onClientUploadComplete={(res) => {
										// Do something with the response
										console.log("Files: ", res);
										alert("Upload Completed");
									}}
									onUploadError={(error: Error) => {
										// Do something with the error.
										alert(`ERROR! ${error.message}`);
									}}
								/> */}
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" asChild>
						<Link href="/dashboard" replace>
							Cancel
						</Link>
					</Button>
					<Button>Deploy</Button>
				</CardFooter>
			</Card>
		</section>
	);
};
export default AddPost;
