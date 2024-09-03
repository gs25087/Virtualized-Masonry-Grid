import React from "react";
import { IPhoto, IMasonryGridProps } from "@/types";
import Photo from "../Photo/Photo";

const MasonryGrid: React.FC<IMasonryGridProps> = ({ photos }) => {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Photo Grid</h1>
			{photos && photos.length > 0 && (
				<div className="grid grid-cols-4 gap-4">
					{photos.map((photo: IPhoto) => (
						<div
							key={photo.id}
							className="mb-4"
						>
							<Photo
								photo={photo}
								width={300}
							/>
						</div>
					))}
				</div>
			)}
			<div></div>
		</div>
	);
};

export default MasonryGrid;
