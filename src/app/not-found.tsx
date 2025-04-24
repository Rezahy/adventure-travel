import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<section className="px-7 py-7 sm:px-10  flex flex-col items-center space-y-5">
			<h2 className="text-primary text-xl sm:text-3xl font-bold">Not Found</h2>
			<p>Could not find requested resource</p>
			<Button variant="outline" asChild>
				<Link href="/" replace>
					Back to home page
				</Link>
			</Button>
		</section>
	);
}
