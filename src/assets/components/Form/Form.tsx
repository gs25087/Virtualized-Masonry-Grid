import { IFormProps } from "@/types";
import { FC, FormEvent, useState } from "react";

const Form: FC<IFormProps> = ({
	handleSearch,
	searchQuery,
	isLoading,
}): JSX.Element => {
	const [inputValue, setInputValue] = useState(searchQuery);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue.trim()) {
			handleSearch(e);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="p-4"
		>
			<input
				type="text"
				name="search"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				disabled={isLoading}
				className={`border p-2 mr-2`}
				placeholder="Search photos..."
			/>
			<button
				type="submit"
				disabled={isLoading || !inputValue.trim()}
				className={` text-white p-2 rounded ${
					!inputValue.trim() ? "pointer-events-none bg-slate-400" : "bg-blue-500"
				}`}
			>
				Search
			</button>
		</form>
	);
};

export default Form;
