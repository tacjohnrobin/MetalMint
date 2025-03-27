"use client";

import { Send, Download, FileText } from "lucide-react";

interface ActionButtonsProps {
	onSend?: () => void;
	onReceive?: () => void;
	onRequest?: () => void;
}

export function ActionButtons({
	onSend,
	onReceive,
	onRequest,
}: ActionButtonsProps) {
	return (
		<div className="border-t border-gray-200 p-4">
			<div className="grid grid-cols-3 gap-2">
				<div
					className="flex flex-col items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer"
					onClick={onSend}
				>
					<div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
						<Send className="h-4 w-4" />
					</div>
					<span className="text-xs font-medium">Send</span>
					<span className="text-xs text-gray-500">
						Send funds from your account
					</span>
				</div>
				<div
					className="flex flex-col items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer"
					onClick={onReceive}
				>
					<div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
						<Download className="h-4 w-4" />
					</div>
					<span className="text-xs font-medium">Receive</span>
					<span className="text-xs text-gray-500">
						Receive funds into your account
					</span>
				</div>
				<div
					className="flex flex-col items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer"
					onClick={onRequest}
				>
					<div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
						<FileText className="h-4 w-4" />
					</div>
					<span className="text-xs font-medium">Request</span>
					<span className="text-xs text-gray-500">
						Request funds for your account
					</span>
				</div>
			</div>
		</div>
	);
}
