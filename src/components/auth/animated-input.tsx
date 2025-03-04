"use client";

import type React from "react";

import {
	useState,
	useRef,
	useEffect,
	type InputHTMLAttributes,
	forwardRef,
} from "react";

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
	({ label, className, value, onChange, onFocus, onBlur, ...props }, ref) => {
		const [isFocused, setIsFocused] = useState(false);
		const [isFilled, setIsFilled] = useState(false);
		const inputRef = useRef<HTMLInputElement>(null);

		// Forward the ref
		useEffect(() => {
			if (ref) {
				if (typeof ref === "function") {
					ref(inputRef.current);
				} else {
					ref.current = inputRef.current;
				}
			}
		}, [ref]);

		// Check if input has value
		useEffect(() => {
			setIsFilled(!!value);
		}, [value]);

		const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(true);
			onFocus?.(e);
		};

		const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			onBlur?.(e);
		};

		const isActive = isFocused || isFilled;

		return (
			<div className="relative">
				<label
					className={`absolute left-3 transform-gpu transition-all duration-300 ease-out pointer-events-none text-sm origin-left ${
						isActive
							? "transform -translate-y-[calc(10%)] scale-75 text-emerald-600 text-md"
							: "top-1/2 -translate-y-1/2 text-gray-500"
					}`}
				>
					{label}
				</label>
				<input
					ref={inputRef}
					className={`w-full pt-6 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-out ${
						isActive ? "border-emerald-600 bg-white pb-2" : "border-gray-300"
					} ${className || ""}`}
					value={value}
					onChange={onChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>
			</div>
		);
	},
);

AnimatedInput.displayName = "AnimatedInput";
