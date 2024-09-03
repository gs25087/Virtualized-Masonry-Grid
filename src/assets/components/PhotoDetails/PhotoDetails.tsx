import { formatDate } from "@/helpers/lib";
import { IPhotoDetailsProps } from "@/types";
import { FC } from "react";
import { useParams, Link } from "react-router-dom";

const PhotoDetails: FC<IPhotoDetailsProps> = ({ data }) => {
	const { id } = useParams<{ id: string }>();

	const photo = data.find((photo) => photo.id === id);

	return (
		<div className="p-4">
			<Link
				to="/"
				className="text-blue-500 hover:underline mb-4 inline-block"
			>
				&larr; Back to Grid
			</Link>
			<h1 className="text-2xl font-bold mb-4">Photo Details</h1>
			<picture className="block my-4">
				<source
					media="(min-width:400px)"
					srcSet={photo?.urls.regular}
				/>
				<img
					src={photo?.urls.small}
					alt={photo?.alt_description || "Photo"}
					className="w-full"
				/>
			</picture>
			<p>Description: {photo?.description || "No description available"}</p>
			<p>
				Author:{" "}
				{photo?.user.first_name +
					(photo?.user.last_name ? " " + photo?.user.last_name : "")}
			</p>
			<p>
				Created at:{" "}
				{photo?.created_at ? formatDate(photo.created_at) : "Unknown date"}
			</p>{" "}
		</div>
	);
};

export default PhotoDetails;
