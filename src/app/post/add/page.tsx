"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/image-upload";
import { useState } from "react";
import dynamic from "next/dynamic";
import FormStepper, { FormStep } from "@/components/form-stepper";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const LazyMap = dynamic(() => import("@/components/map"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

const AddPost = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [currentStep, setCurrentStep] = useState(1);
	const formSteps: FormStep[] = [
		{
			id: "form-step-1",
			level: 1,
			title: "Title & Content",
			description: "Add your post title and content",
			component: (
				<>
					<Label htmlFor="title">Title</Label>
					<Input id="title" placeholder="Title of your post" />
					<Label htmlFor="content">Content</Label>
					<Textarea
						id="content"
						placeholder="Content of your post"
						className="min-h-[100px]"
					/>
				</>
			),
		},
		{
			id: "form-step-2",
			level: 2,
			title: "Post Location",
			description: "Mark your post location",
			component: (
				<div className="relative w-full h-[400px]">
					<LazyMap />
				</div>
			),
		},
		{
			id: "form-step-3",
			level: 3,
			title: "Upload Image",
			description: "add an Image to your post",
			component: (
				<div className="border rounded-lg p-4">
					<ImageUpload
						endPoint="postImage"
						value={imageUrl}
						onChange={(url) => {
							setImageUrl(url);
						}}
					/>
				</div>
			),
		},
	];
	const onNextStepHandler = () => {
		setCurrentStep((prev) => prev + 1);
	};
	const onBackStepHandler = () => {
		setCurrentStep((prev) => prev + -1);
	};
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<Card className="max-w-2xl mx-auto">
				<CardContent>
					<FormStepper formSteps={formSteps} currentStep={currentStep} />
				</CardContent>
				{/* <CardHeader>
					<CardTitle>Create new post</CardTitle>
					<CardDescription>Make your new post.</CardDescription>
				</CardHeader> */}
				{/* <CardContent>
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
				</CardContent> */}
				{/* <CardFooter className="flex justify-between">
					<Button variant="outline" asChild>
						<Link href="/dashboard" replace>
							Cancel
						</Link>
					</Button>
					<Button>Deploy</Button>
				</CardFooter> */}
				<CardFooter
					className={cn("flex justify-between", {
						"justify-end": currentStep <= 1,
					})}
				>
					{currentStep > 1 && (
						<Button
							variant="outline"
							className="mr-4 p-0"
							onClick={onBackStepHandler}
						>
							<ChevronLeftIcon className="h-5 w-5" />
							Back
						</Button>
					)}
					{currentStep === formSteps.length ? (
						<Button
							disabled={true}
							className="disabled:cursor-not-allowed cursor-pointer"
						>
							Create Post
						</Button>
					) : (
						<Button onClick={onNextStepHandler}>
							Next
							<ChevronRightIcon className="h-5 w-5" />
						</Button>
					)}
				</CardFooter>
			</Card>
		</section>
	);
};
export default AddPost;
