import { PropsWithChildren } from "react";

const Header = ({ children }: PropsWithChildren) => {
	return (
		<h1 className="text-primary text-xl sm:text-3xl font-bold pb-7">
			{children}
		</h1>
	);
};
export default Header;
