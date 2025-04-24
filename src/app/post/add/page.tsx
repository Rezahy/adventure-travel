"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import FormStepper, { FormStep } from "@/components/form-stepper";
import { ChevronLeftIcon, ChevronRightIcon, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { EdgeStoreSingleImageUpload } from "@/components/edgestore-image-upload";
import { toast } from "sonner";
import { LatLng } from "leaflet";
import LazyMarkAbleMap from "@/components/map/lazy-mark-able-map";

import { createPost } from "@/actions/postAction";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import LazyLocationMarker from "@/components/map/lazy-location-marker";

const AddPost = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [currentStep, setCurrentStep] = useState(1);
	const [position, setPosition] = useState<LatLng | null>(null);
	const [isPending, startTransition] = useTransition();
	const { isSignedIn, userId: clerkId } = useAuth();
	const router = useRouter();

	const formSteps: FormStep[] = [
		{
			id: "form-step-1",
			level: 1,
			title: "Title & Content",
			description: "Add your post title and content",
			component: (
				<>
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						placeholder="Title of your post"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Label htmlFor="content">Content</Label>
					<Textarea
						id="content"
						placeholder="Content of your post"
						className="min-h-[100px] text-justify"
						value={content}
						onChange={(e) => setContent(e.target.value)}
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
					<LazyMarkAbleMap>
						<LazyLocationMarker position={position} setPosition={setPosition} />
					</LazyMarkAbleMap>
				</div>
			),
		},
		{
			id: "form-step-3",
			level: 3,
			title: "Upload Image",
			description: "add an Image to your post",
			component: (
				<div className="border rounded-lg p-4 flex justify-center">
					<EdgeStoreSingleImageUpload
						value={imageUrl}
						onChange={(url) => setImageUrl(url)}
					/>
				</div>
			),
		},
	];
	const onNextStepHandler = () => {
		switch (currentStep) {
			case 1: {
				if (title.trim().length === 0 || content.trim().length === 0) {
					toast.error(
						`${title.trim().length === 0 ? "title" : "content"} is empty!`
					);
					return;
				}
				if (title.length < 8) {
					toast.error(`title must be at least 8 character`);
					return;
				}
				if (content.length < 20) {
					toast.error(`content must be at least 20 character`);
					return;
				}
				break;
			}
			case 2: {
				if (!position) {
					toast.error("please add your marker on the map");
					return;
				}
				break;
			}
		}
		setCurrentStep((prev) => prev + 1);
	};
	const onBackStepHandler = () => {
		setCurrentStep((prev) => prev + -1);
	};
	const createPostHandler = () => {
		if (!imageUrl) {
			toast.error("please upload your image");
			return;
		}
		if (isSignedIn && clerkId && position && imageUrl) {
			startTransition(async () => {
				await createPost(
					clerkId,
					title,
					content,
					imageUrl,
					position.lat,
					position.lng
				);
				toast.success("post created successfully.");
				router.replace("/dashboard");
			});
		}
	};
	return (
		<section className="px-7 py-7 sm:px-10 pb-10">
			<Card className="max-w-2xl mx-auto">
				<CardContent>
					<FormStepper formSteps={formSteps} currentStep={currentStep} />
				</CardContent>
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
							disabled={isPending}
							onClick={createPostHandler}
							className="disabled:cursor-not-allowed cursor-pointer"
						>
							{isPending ? <Loader className="animate-spin" /> : "Create Post"}
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
