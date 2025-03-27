"use client";

import { useState } from "react";
import { CopyIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyProps {
	title: string;
}

const Copy = ({ title }: CopyProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(title);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex items-center justify-between text-sm text-gray-500 mt-2">
			<div className="truncate max-w-[180px]">{title}</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8"
							onClick={handleCopy}
						>
							{copied ? (
								<CheckCircle className="h-4 w-4 text-green-500" />
							) : (
								<CopyIcon className="h-4 w-4" />
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{copied ? "Copied!" : "Copy account ID"}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export default Copy;
