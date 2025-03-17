"use client";

import { LogOut, Settings, Shield, User, HelpCircle, Eye } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

export function UserNav() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-9 w-9 rounded-full">
					<Avatar className="h-9 w-9">
						<AvatarFallback className="bg-green-300 text-sm text-gray-800">
							QC
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64 p-0 mt-3" align="end" forceMount>
				<div className="flex flex-col items-center gap-2 p-4">
					<Avatar className="h-16 w-16">
						<AvatarFallback className="bg-green-300 text-xl">QC</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-center space-y-2">
						<p className="text-sm font-medium">Qubo Creatives</p>
						<p className="text-xs text-muted-foreground">$0.00 USD</p>
					</div>
					<Button
						variant="ghost"
						size="sm"
						className="w-hug bg-blue-50 p-4 rounded-3xl text-blue-600 hover:bg-blue-100 hover:text-blue-700 mt-3"
					>
						Finish setting up account
					</Button>
				</div>
				<DropdownMenuSeparator className="mb-2" />
				<DropdownMenuGroup className="p-1">
					<DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5">
						<User className="h-4.5 w-4.5" />
						<span>Account Details</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5">
						<Settings className="h-4.5 w-4.5" />
						<span>Settings</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5">
						<HelpCircle className="h-4.5 w-4.5" />
						<span>Support</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="my-2" />
				<DropdownMenuGroup className="p-1">
					{/*<DropdownMenuItem className="flex items-center justify-between px-3 py-2.5">
						<div className="flex items-center gap-3">
							<Eye className="h-4.5 w-4.5" />
							<span>Privacy mode</span>
						</div>
						<Switch />
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 text-red-600 focus:text-red-600">
						<LogOut className="h-4.5 w-4.5" />
						<span>Log out</span>
					</DropdownMenuItem> */}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
