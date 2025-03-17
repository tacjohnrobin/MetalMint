"use client";

import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VerificationAlert() {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<div className="mb-6 rounded-lg border border-amber-100 bg-amber-50 p-4 shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex ">
					<AlertCircle className="mr-3 h-8 w-8 flex-shrink-0 text-amber-500" />
					<div>
						<h3 className="text-sm font-medium text-amber-800">
							Account verification required
						</h3>
						<div className="mt-1 text-sm text-amber-700">
							<p>
								Please complete the verification process to unlock all features
								and ensure the security of your account.
							</p>
						</div>
						<div className="mt-3">
							<a href="#">
								<Button
									size="sm"
									variant="outline"
									className="border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200 hover:text-amber-900"
								>
									Verify now
								</Button>
							</a>
						</div>
					</div>
				</div>
				<button
					type="button"
					className="ml-3 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-amber-500 hover:bg-amber-100 hover:text-amber-600 focus:outline-none"
					onClick={() => setIsVisible(false)}
				>
					<span className="sr-only">Dismiss</span>
					<X className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
