"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "./userNav";

export function Header() {
	const segment = useSelectedLayoutSegment();

	// Map the segment to a readable page title
	const getPageTitle = () => {
		if (!segment) return "Home";

		// Capitalize first letter and replace hyphens with spaces
		return (
			segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
		);
	};

	return (
		<header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-6 sticky top-0 z-50">
			<div className="flex items-center gap-4">
				<SidebarTrigger className="-ml-1 md:hidden" />
				<h1 className="pl-4 text-xl font-semibold text-gray-600 tracking-tight">
					{getPageTitle()}
				</h1>
			</div>
			<UserNav />
		</header>
	);
}
