"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { AnimatePresence, motion } from "motion/react";
import { JSX } from "react";

export type FormStep = {
	level: number;
	id: string;
	title: string;
	description: string;
	component: JSX.Element;
};

type FormStepperProps = {
	formSteps: FormStep[];
	currentStep: number;
};
const FormStepper = ({ formSteps, currentStep }: FormStepperProps) => {
	const router = useRouter();
	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<Button
					variant="link"
					className="mr-4 p-0"
					onClick={() => router.back()}
				>
					Cancel
				</Button>
				<div className="text-sm font-medium text-muted-foreground w-20 text-right">
					{currentStep}/{formSteps.length}
				</div>
			</div>
			<Progress
				value={(currentStep / formSteps.length) * 100}
				className="h-2"
			/>
			<div className="mt-4 text-center">
				<h1 className="text-2xl font-semibold mb-2">
					{formSteps[currentStep - 1].title}
				</h1>

				<p className="text-sm text-muted-foreground mx-auto max-w-md">
					{formSteps[currentStep - 1].description}
				</p>
			</div>
			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={currentStep}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					transition={{ duration: 0.15 }}
					className="h-full flex flex-col space-y-2 pt-5"
				>
					{formSteps[currentStep - 1].component}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
export default FormStepper;
