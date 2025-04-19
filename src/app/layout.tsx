import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import AppToaster from "@/components/app-toaster";
import AppSidebarTrigger from "@/components/app-sidebar-trigger";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Adventure Travel",
	description: "Adventure Travel Blog Post",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				elements: {
					organizationSwitcherPopoverRootBox: {
						width: "100%",
						pointerEvents: "auto",
					},
					userButtonPopoverRootBox: {
						width: "100%",
						pointerEvents: "auto",
					},
				},
			}}
		>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SidebarProvider>
							<AppSidebar />

							<main className="w-screen">
								<AppSidebarTrigger />
								<section className="max-w-6xl mx-auto">{children}</section>
							</main>

							<div className="absolute top-5 right-5">
								<ModeToggle />
							</div>
						</SidebarProvider>
						<AppToaster />
						<Footer />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
