import { LoginForm } from "@/components/auth/loginform";
import { Navbar } from "@/components/auth/navbarAuth";

export default function LoginPage() {
	return (
		<div className="flex min-h-svh flex-col bg-background">
			<Navbar />
			<div className="flex flex-1 items-center justify-center p-6 md:p-10">
				<div className="w-full max-w-sm">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
