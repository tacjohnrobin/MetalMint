import { MetalmintSidebar } from "@/components/custom/sideBar";
import { Header } from "@/components/dashboard/header";

import {
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthGuard } from "@/middlewares/auth-guard";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthGuard requireAuth={false}>
			<SidebarProvider>
				<MetalmintSidebar />
				<SidebarInset>
					<Header />
					{/* Added Header component */}
					<main className="p-4">{children}</main>{" "}
					{/* Changed <body> to <main> */}
				</SidebarInset>
			</SidebarProvider>
		</AuthGuard>
	);
}
