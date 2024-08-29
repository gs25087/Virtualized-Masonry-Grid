import React from "react";
import { useParams, Link } from "react-router-dom";

const PhotoDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div>
			<Link
				to="/"
				className="text-blue-500 hover:underline mb-4 inline-block"
			>
				&larr; Back to Grid
			</Link>
			<h1 className="text-2xl font-bold mb-4">Photo Details</h1>
			<p>Photo ID: {id}</p>
			{/* Photo details will go here */}
		</div>
	);
};

export default PhotoDetails;
