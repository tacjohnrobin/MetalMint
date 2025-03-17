import type { Metadata } from "next";
import { Geologica } from "next/font/google"; // Import Geologica from Google Fonts
import localFont from "next/font/local";
import "./globals.css";

// Importing fonts with a premium look
const geologica = Geologica({
	subsets: ["latin"],
	variable: "--font-geologica",
	weight: ["400", "500", "600", "700", "800", "900"], // Using heavier weights for a strong brand presence
});

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "300 900", // Medium to bold for a luxurious feel
	display: "swap",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "300 900",
	display: "swap",
});

// Updated metadata to align with Metalmint's branding
export const metadata: Metadata = {
	title: "Metalmint | Trusted Gold Trading",
	description:
		"Metalmint is a premier platform for secure and efficient gold trading.",
	icons: {
		icon: "/icons/favi.svg", // Ensure you have a brand favicon
	},
	openGraph: {
		title: "Metalmint | Trusted Gold Trading",
		description:
			"Metalmint offers a secure, transparent, and seamless platform for trading gold and precious metals.",
		images: "/icons/favi.svg", // Update with your branding image
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={`${geologica.variable} ${geistSans.variable} antialiased bg-white text-[#d4af37]`}
			>
				{children}
			</body>
		</html>
	);
}
