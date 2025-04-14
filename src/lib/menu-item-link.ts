import { MenuItemLink } from "@/@types/menu-item-link";
import { Bookmark, Home, LayoutDashboard, MapPin } from "lucide-react";

export const menuItemLinks: MenuItemLink[] = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Bookmarked Posts",
		url: "/bookmarked",
		icon: Bookmark,
	},
	{
		title: "Map",
		url: "/map",
		icon: MapPin,
	},
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
];
