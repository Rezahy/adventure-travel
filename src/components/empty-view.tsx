import { PropsWithChildren } from "react";

const EmptyView = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex items-center justify-center mt-7">
			<h3 className="font-semibold sm:text-xl text-center">{children}</h3>
		</div>
	);
};

export default EmptyView;
