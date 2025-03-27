"use client";

import type React from "react";
import { useState, useMemo, forwardRef } from "react";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";

import { countries } from "./countries"; // Import countries data
import { AnimatedInput } from "./auth/animated-input";

interface CustomPhoneInputProps {
	value: string;
	onChange: (value: string) => void;
	error?: { message?: string };
	name?: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
	value,
	onChange,
	error,
	name,
}) => {
	const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to the first country
	const [searchQuery, setSearchQuery] = useState("");
	const [open, setOpen] = useState(false);

	const filteredCountries = useMemo(() => {
		return countries.filter(
			(country) =>
				country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				country.dialCode.includes(searchQuery),
		);
	}, [searchQuery]);

	const handleCountrySelect = (
		country: React.SetStateAction<{
			name: string;
			code: string;
			dialCode: string;
			format: string;
		}>,
	) => {
		setSelectedCountry(country);
		setOpen(false);
		setSearchQuery("");
	};

	// CustomPhoneInput component (phoneInput.tsx)
	const handlePhoneChange = (phoneNumber: string | undefined) => {
		// If the phone number is undefined or empty, set it to an empty string
		if (!phoneNumber) {
			onChange("");
			return;
		}

		// If the phone number doesn't already include the country code, add it
		// This ensures we're sending the full international format to the API
		let formattedPhone = phoneNumber;

		// If the phone number doesn't start with '+', add the selected country code
		if (!formattedPhone.startsWith("+")) {
			formattedPhone = `+${selectedCountry.dialCode}${formattedPhone}`;
		}

		onChange(formattedPhone);
	};

	// Custom input component that uses AnimatedInput
	const CustomAnimatedInput = forwardRef((props: any, ref) => (
		<AnimatedInput
			{...props}
			ref={ref}
			label="Phone Number"
			className={`flex-1 ${error ? "border-red-500" : ""}`}
			placeholder={selectedCountry.format}
		/>
	));

	CustomAnimatedInput.displayName = "CustomAnimatedInput";

	return (
		<div className="flex flex-col">
			<div className="flex">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="flex items-center h-10 px-3 rounded-r-none mt-6"
						>
							<img
								src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.code}.svg`}
								alt={selectedCountry.name}
								className="w-5 h-5 rounded-full object-cover mr-2"
							/>
							<span className="text-sm font-medium mr-1">
								+{selectedCountry.dialCode}
							</span>
							<ChevronDown className="h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-80 p-0">
						<div className="p-2">
							<div className="flex items-center space-x-2 mb-2">
								<Search className="w-4 h-4 opacity-50" />
								<Input
									placeholder="Search countries..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="h-8"
								/>
							</div>
						</div>
						<ScrollArea className="h-72">
							{filteredCountries.map((country) => (
								<Button
									key={country.code}
									variant="ghost"
									className="w-full justify-start rounded-none"
									onClick={() => handleCountrySelect(country)}
								>
									<img
										src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
										alt={country.name}
										className="w-5 h-5 rounded-full object-cover mr-2"
									/>
									<span>{country.name}</span>
									<span className="ml-auto">+{country.dialCode}</span>
								</Button>
							))}
						</ScrollArea>
					</PopoverContent>
				</Popover>
				<PhoneInput
					international
					countrycallingcodeeditable={false}
					defaultCountry={selectedCountry.code.toLowerCase()}
					value={
						value.startsWith("+")
							? value
							: `+${selectedCountry.dialCode}${value}`
					}
					onChange={handlePhoneChange}
					inputComponent={CustomAnimatedInput}
					className="flex-1"
					countrySelectComponent={() => null}
					name={name}
				/>
			</div>
		</div>
	);
};

export default CustomPhoneInput;
