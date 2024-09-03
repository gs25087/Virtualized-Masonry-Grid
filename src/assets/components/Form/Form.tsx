import { IFormProps } from "@/types";
import { FC } from "react";

const Form: FC<IFormProps> = ({
	handleSearch,
	searchQuery,
	isLoading,
}): JSX.Element => {
	return (
		<form
			onSubmit={handleSearch}
			className="p-4"
		>
			<input
				disabled={isLoading}
				type="text"
				name="search"
				defaultValue={searchQuery}
				className="border p-2 mr-2"
				placeholder="Search photos..."
			/>
			<button
				type="submit"
				className="bg-blue-500 text-white p-2 rounded"
			>
				Search
			</button>
		</form>
	);
};

export default Form;
