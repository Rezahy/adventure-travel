"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const SearchInput = () => {
	const searchRef = useRef<HTMLInputElement | null>(null);
	const searchParams = useSearchParams();
	const router = useRouter();
	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (searchRef.current && searchRef.current.value.trim().length > 0) {
			const value = searchRef.current.value;
			router.replace(`/search?q=${value}`);
		}
	};
	return (
		<div className="max-w-xl mx-auto relative">
			<form onSubmit={onSubmitHandler}>
				<Input
					placeholder="Search posts ..."
					className="pr-9"
					name="search"
					defaultValue={searchParams.get("q") ?? ""}
					ref={searchRef}
				/>
				<Button
					variant="ghost"
					size="sm"
					className="absolute right-0.5 text-gray-500 top-[50%] -translate-y-[50%]"
				>
					<Search absoluteStrokeWidth size={16} />
				</Button>
			</form>
		</div>
	);
};
export default SearchInput;
