"use client";

import {
	Home,
	LineChart,
	ArrowRightLeft,
	Settings,
	UserCircle,
	LogOut,
	Wallet,
	Menu,
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
	SidebarTrigger,
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

	// Navigation items
	const mainNavItems = [
		{ path: "/home", label: "Dashboard", icon: Home },
		{ path: "/holdings", label: "Holdings", icon: Wallet },
		{ path: "/analytics", label: "Analytics", icon: LineChart },
		{ path: "/transfers", label: "Transfers", icon: ArrowRightLeft },
	];

	const footerNavItems = [
		{ path: "/settings", label: "Settings", icon: Settings },
		{ path: "/profile", label: "Profile", icon: UserCircle },
	];

	return (
		<>
			{/* Mobile menu trigger - visible only on small screens */}
			<div className="fixed top-4  md:hidden">
				<SidebarTrigger className="bg-white shadow-md rounded-full p-2 border ">
					<Menu className="h-5 w-5 text-[#d4af37]" />
				</SidebarTrigger>
			</div>

			<Sidebar
				collapsible="offcanvas"
				className="bg-white border-r shadow-sm h-full"
				variant="sidebar"
				style={{ backgroundColor: "white" }}
			>
				<SidebarHeader className="">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="lg"
								asChild
								className="hover:bg-transparent bg-white"
							>
								<a href="/home" className="w-full flex items-center">
									<div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-white ">
										<Image
											src="/icons/favi.svg"
											alt="MetalMint Logo"
											width={32}
											height={32}
										/>
									</div>
									<div className="flex flex-col">
										<span className="text-xl font-bold text-[#d4af37]">
											MetalMint
										</span>
									</div>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>

				<SidebarContent className="px-3 py-6 bg-white">
					<SidebarMenu className="space-y-1.5">
						{mainNavItems.map((item) => (
							<SidebarMenuItem key={item.path}>
								<SidebarMenuButton
									className={cn(
										"w-full rounded-none transition-all duration-200 py-2.5 bg-white",
										isActive(item.path)
											? "bg-gray-50 text-[#d4af37] font-medium"
											: "text-gray-600 hover:text-[#d4af37] hover:bg-gray-50",
									)}
									tooltip={item.label}
								>
									<a
										href={item.path}
										className="flex items-center w-full group"
									>
										<item.icon
											className={cn(
												"size-5 mr-3",
												isActive(item.path)
													? "fill-[#d4af37]/10 text-[#d4af37]"
													: "text-gray-500 group-hover:text-[#d4af37]",
											)}
										/>
										<span className="text-sm font-medium">{item.label}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarContent>

				<SidebarFooter className="px-3 py-4 mt-auto bg-white">
					<SidebarMenu className="space-y-1.5">
						{footerNavItems.map((item) => (
							<SidebarMenuItem key={item.path}>
								<SidebarMenuButton
									className={cn(
										"w-full rounded-none transition-all duration-200 py-2.5 bg-white",
										isActive(item.path)
											? "bg-gray-50 text-[#d4af37] font-medium"
											: "text-gray-600 hover:text-[#d4af37] hover:bg-gray-50",
									)}
									tooltip={item.label}
								>
									<a
										href={item.path}
										className="flex items-center w-full group"
									>
										<item.icon
											className={cn(
												"size-5 mr-3",
												isActive(item.path)
													? "fill-[#d4af37]/10 text-[#d4af37]"
													: "text-gray-500 group-hover:text-[#d4af37]",
											)}
										/>
										<span className="text-sm font-medium">{item.label}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}

						<Separator className="my-3" />

						<SidebarMenuItem>
							<SidebarMenuButton
								className="w-full rounded-none transition-all duration-200 py-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 bg-white"
								tooltip="Log Out"
							>
								<a href="/login" className="flex items-center w-full group">
									<LogOut className="size-5 mr-3 text-gray-500 group-hover:text-red-500" />
									<span className="text-sm font-medium">Log Out</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>

				<SidebarRail />
			</Sidebar>
		</>
	);
}
