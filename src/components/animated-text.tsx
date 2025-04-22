"use client";

import { motion } from "motion/react";
import { PropsWithChildren } from "react";
const AnimatedText = ({ children }: PropsWithChildren) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
};
export default AnimatedText;
