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

export function MetalmintSidebar() {
	return (
		<Sidebar collapsible="icon" className=" bg-white">
			<SidebarHeader className="p-3 mb-8">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#" className="flex items-center">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
									<Image
										src="/icons/favi.svg"
										alt="MetalMint Logo"
										width={28}
										height={28}
									/>
								</div>
								<div className=" flex flex-col gap-0.5 tracking-wider">
									<span className="text-xl font-semibold text-[#d4af37] ">
										MetalMint
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className="p-4">
				<SidebarMenu className="space-y-4">
					<SidebarMenuItem>
						<SidebarMenuButton className="text-gray-700 text-md">
							<a href="/home" className="flex col gap-2 items-center">
								<Home className="" />
								<span>Home</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>

					<SidebarMenuItem>
						<SidebarMenuButton className="text-gray-700 text-md ">
							<a href="/holdings" className="flex col gap-2 items-center">
								<BarChart3 className="size-5" />
								<span>Holdings</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>

					<SidebarMenuItem>
						<SidebarMenuButton className="text-gray-700 text-md">
							<a href="/market" className="flex col gap-2 items-center">
								<ShoppingCart className="size-5" />
								<span>Market</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>

					<SidebarMenuItem>
						<SidebarMenuButton className="text-gray-700 text-md">
							<a href="/transfers" className="flex col gap-2 items-center">
								<ArrowLeftRight className="size-5" />
								<span>Transfers</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="text-gray-700 text-md">
							<a href="/settings" className="flex col gap-2 items-center">
								<Settings className="size-5" />
								<span>Settings</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>

					<SidebarMenuItem>
						<SidebarMenuButton className="text-gray-700 text-md">
							<a href="/ptofile" className="flex col gap-2 items-center">
								<User className="size-5" />
								<span>Profile</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>

					<Separator className="my-2" />

					<SidebarMenuItem>
						<SidebarMenuButton className="text-gray-700 text-md">
							<a href="/login" className="flex col gap-2 items-center">
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
