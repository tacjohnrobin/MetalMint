import { MetalmintSidebar } from "@/components/custom/sideBar";
import { UserNav } from "@/components/dashboard/userNav";
import {
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<MetalmintSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-6 sticky top-0 z-50">
					<div className="flex items-center gap-4">
						<SidebarTrigger className="-ml-1" />
					</div>
					<UserNav />
				</header>
				<main className="p-4">{children}</main> {/* Changed <body> to <main> */}
			</SidebarInset>
		</SidebarProvider>
	);
}
