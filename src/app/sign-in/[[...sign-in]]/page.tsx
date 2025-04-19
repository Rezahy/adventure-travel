"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
	const { theme, systemTheme } = useTheme();
	return (
		<section className="px-7 py-7 sm:px-10 pb-10 flex justify-center">
			{theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
				<SignIn appearance={{ baseTheme: dark }} />
			) : (
				<SignIn />
			)}
		</section>
	);
}
