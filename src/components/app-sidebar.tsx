"use client";

import { LogIn, Map, Search, UserRoundPlus } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormEvent, useRef } from "react";
import { menuItemLinks } from "@/lib/menu-item-link";
import FlipText from "./flip-text";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const AppSidebar = () => {
	const router = useRouter();
	const { user } = useUser();
	const { theme, systemTheme } = useTheme();
	const { isMobile, setOpenMobile } = useSidebar();
	const pathname = usePathname();
	const searchRef = useRef<HTMLInputElement | null>(null);
	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (searchRef.current && searchRef.current.value.trim().length > 0) {
			const { value } = searchRef.current;
			router.push(`/search?q=${decodeURI(value)}`);
			sidebarMenuButtonClickHandler();
		}
	};
	const sidebarMenuButtonClickHandler = () => {
		if (isMobile) {
			setOpenMobile(false);
		}
	};
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="mt-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Adventure Travel"
							asChild
							size="lg"
							isActive={pathname === "/"}
							onClick={sidebarMenuButtonClickHandler}
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Link href="/">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#B8336A] text-sidebar-primary-foreground">
									<Map className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										<FlipText>Adventure Travel</FlipText>
										<span className="sr-only">Adventure Travel</span>
									</span>
									<span className="truncate text-xs mt-1">
										Escape and unwind!
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarHeader className="relative group-data-[collapsible=icon]:hidden">
				<form onSubmit={onSubmitHandler}>
					<Input
						placeholder="Search posts ..."
						className="pr-9"
						ref={searchRef}
						autoFocus={false}
						tabIndex={-1}
					/>
					<Button
						variant="ghost"
						size="sm"
						className="absolute right-2 text-gray-500 top-[50%] -translate-y-[50%]"
					>
						<Search absoluteStrokeWidth size={16} />
					</Button>
				</form>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					{/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItemLinks.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={item.title}
										asChild
										isActive={pathname === item.url}
										onClick={sidebarMenuButtonClickHandler}
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SignedOut>
					<SidebarGroup>
						<SidebarGroupLabel>Authentication</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip="sign up"
										asChild
										isActive={pathname === "/sign-up"}
										onClick={sidebarMenuButtonClickHandler}
									>
										<Link href="/sign-up">
											<UserRoundPlus />
											<span>Sign up</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip="sign in"
										asChild
										isActive={pathname === "/sign-in"}
										onClick={sidebarMenuButtonClickHandler}
									>
										<Link href="/sign-in">
											<LogIn />
											<span>Sign in</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SignedOut>
			</SidebarContent>
			<SignedIn>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<SignedIn>
									{theme === "dark" ||
									(theme === "system" && systemTheme === "dark") ? (
										<UserButton appearance={{ baseTheme: dark }} />
									) : (
										<UserButton />
									)}
								</SignedIn>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{user?.username}
									</span>
									<span className="truncate text-xs">
										{user?.emailAddresses[0].toString()}
									</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</SignedIn>
		</Sidebar>
	);
};

export default AppSidebar;
