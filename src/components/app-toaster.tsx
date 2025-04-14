"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";
type Theme = "light" | "dark" | "system" | undefined;
const AppToaster = () => {
	const { theme } = useTheme();
	return <Toaster theme={theme as Theme} />;
};
export default AppToaster;
