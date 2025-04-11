import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import Inter from Google Fonts
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

// Site metadata
export const metadata: Metadata = {
	title: "Metalmint | Trusted Gold Trading",
	description:
		"Metalmint is a premier platform for secure and efficient gold trading.",
	icons: {
		icon: "/icons/favi.svg",
	},
	openGraph: {
		title: "Metalmint | Trusted Gold Trading",
		description:
			"Metalmint offers a secure, transparent, and seamless platform for trading gold and precious metals.",
		images: "/icons/favi.svg",
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
				className={`${inter.variable} font-sans antialiased bg-white`}
			>
				{children}
			</body>
		</html>
	);
}
