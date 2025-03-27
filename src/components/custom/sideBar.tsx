"use client";
import {
	Home,
	BarChart3,
	ShoppingCart,
	ArrowLeftRight,
	Settings,
	User,
	LogOut,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MetalmintSidebar() {
	const pathname = usePathname();

	// Function to check if the current path matches the menu item path
	const isActive = (path: string) => {
		return pathname === path;
	};

	// Function to get the appropriate class names based on active state
	const getMenuItemClasses = (path: string) => {
		return cn(
			"text-md transition-colors duration-200",
			isActive(path)
				? "text-[#d4af37] font-medium bg-gray-100 rounded-3xl"
				: "text-gray-700 hover:text-[#d4af37] hover:bg-gray-50",
		);
	};

	return (
		<Sidebar collapsible="icon" className="bg-white">
			<SidebarHeader className="p-3 mb-8">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#" className="flex items-center">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg">
									<Image
										src="/icons/favi.svg"
										alt="MetalMint Logo"
										width={28}
										height={28}
									/>
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-xl font-semibold text-[#d4af37]">
										MetalMint
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className="p-4">
				<SidebarMenu className="space-y-3">
					<SidebarMenuItem>
						<SidebarMenuButton className={getMenuItemClasses("/home")}>
							<a href="/home" className="flex items-center gap-2 p-2 w-full">
								<Home className="size-5" />
								<span>Home</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>

					<SidebarMenuItem>
						<SidebarMenuButton className={getMenuItemClasses("/holdings")}>
							<a
								href="/holdings"
								className="flex items-center gap-2 p-2 w-full"
							>
								<BarChart3 className="size-5" />
								<span>Holdings</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className={getMenuItemClasses("/transfers")}>
							<a
								href="/analytics"
								className="flex items-center gap-2 p-2 w-full"
							>
								<ArrowLeftRight className="size-5" />
								<span>analytics</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className={getMenuItemClasses("/transfers")}>
							<a
								href="/transfers"
								className="flex items-center gap-2 p-2 w-full"
							>
								<ArrowLeftRight className="size-5" />
								<span>Transfers</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter className="p-4">
				<SidebarMenu className="space-y-2">
					*
					<SidebarMenuItem>
						<SidebarMenuButton className={getMenuItemClasses("/settings")}>
							<a
								href="/settings"
								className="flex items-center gap-2 p-2 w-full"
							>
								<Settings className="size-5" />
								<span>Settings</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className={getMenuItemClasses("/profile")}>
							<a
								href="/settings"
								className="flex items-center gap-2 p-2 w-full"
							>
								<User className="size-5" />
								<span>Profile</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<Separator className="my-2" />
					<SidebarMenuItem>
						<SidebarMenuButton className="text-gray-700 text-md hover:text-[#d4af37] hover:bg-gray-50 transition-colors duration-200">
							<a href="/login" className="flex items-center gap-2 p-2 w-full">
								<LogOut className="size-5" />
								<span>Log Out</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
