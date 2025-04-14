"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import { cn } from "@/lib/utils";

const AppSidebarTrigger = () => {
	const pathname = usePathname();
	return (
		<SidebarTrigger
			className={cn(
				"mt-5 ml-5 z-10 relative bg-background dark:bg-background/50  dark:hover:bg-background/75",
				{
					"absolute right-5 top-12 md:relative md:top-0 md:right-0":
						pathname === "/map",
				}
			)}
		/>
	);
};
export default AppSidebarTrigger;
