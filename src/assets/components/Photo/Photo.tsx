import { IPhotoProps } from "@/types";
import React from "react";

const Photo: React.FC<IPhotoProps> = ({ photo, width }) => {
	let src = photo.urls.thumb;
	if (width > 200 && width <= 400) {
		src = photo.urls.small;
	}

	return (
		<img
			src={src}
			alt={photo.alt_description || "Photo"}
			style={{ width: "100%" }}
			loading="lazy"
			className="bg-tourqoise-200"
		/>
	);
};

export default Photo;
