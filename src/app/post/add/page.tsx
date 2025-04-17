"use client";

import { Button } from "@/components/ui/button";
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
import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/map"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

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
						<div className="grid w-full items-center">
							<div className="flex flex-col space-y-2">
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
								<div className="relative w-full h-[400px]">
									<LazyMap />
								</div>
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
