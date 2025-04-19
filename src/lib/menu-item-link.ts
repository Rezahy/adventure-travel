import { MenuItemLink } from "@/@types/menu-item-link";
import { Bookmark, LayoutDashboard, MapPin } from "lucide-react";

export const menuItemLinks: MenuItemLink[] = [
	{
		title: "Bookmarked",
		url: "/bookmark",
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
