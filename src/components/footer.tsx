import Link from "next/link";
import Github from "./icons/github";

const Footer = () => {
	return (
		<footer className="py-10 border text-center italic">
			<h3 className="flex justify-center items-center">
				Developed By
				<div className="flex group cursor-pointer">
					<Github className="ml-2" />
					<Link
						href="https://github.com/Rezahy"
						target="_blank"
						className="group-hover:underline"
					>
						Rezahy
					</Link>
				</div>
			</h3>
		</footer>
	);
};
export default Footer;
