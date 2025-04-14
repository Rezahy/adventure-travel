"use client";

import { Search } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
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

const AppSidebar = () => {
	const router = useRouter();
	const { isMobile, setOpenMobile } = useSidebar();
	const pathname = usePathname();
	const searchRef = useRef<HTMLInputElement | null>(null);
	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (searchRef.current && searchRef.current.value.trim().length > 0) {
			const { value } = searchRef.current;
			router.push(`/search/${decodeURI(value)}`);
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
			<SidebarHeader className="relative mt-2 group-data-[collapsible=icon]:hidden">
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
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItemLinks.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={item.title}
										asChild
										isActive={pathname === item.url}
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
			</SidebarContent>
		</Sidebar>
	);
};

export default AppSidebar;
