import React from "react";
import { IPhoto, IMasonryGridProps } from "@/types";
import Photo from "../Photo/Photo";
import { Link } from "react-router-dom";
import { useContainerSize } from "../../../hooks/useContainerSize";
import { useColumnCalculations } from "../../../hooks/useColumnCalculation";
import { useItemDimensions } from "../../../hooks/useItemDimensions";

const MasonryGrid: React.FC<IMasonryGridProps> = ({
	photos,
	masonryGridRef,
	minColumnWidth,
	cellGap,
}) => {
	const { containerSize, updateSize } = useContainerSize(masonryGridRef);

	const { columnCount, columnWidth } = useColumnCalculations(
		containerSize.width,
		minColumnWidth,
		cellGap
	);

	const { getItemHeight, getTotalHeight } = useItemDimensions(
		photos,
		columnWidth,
		cellGap
	);

	return (
		<div ref={masonryGridRef}>
			<h1 className="text-2xl font-bold mb-4">Photo Grid</h1>
			{photos && photos.length > 0 && (
				<div className="grid grid-cols-4 gap-4">
					{photos.map((photo: IPhoto) => (
						<Link
							to={`/photo/${photo.id}`}
							key={photo.id}
							className="mb-4"
						>
							<Photo
								photo={photo}
								width={300}
							/>
						</Link>
					))}
				</div>
			)}
			<div></div>
		</div>
	);
};

export default MasonryGrid;
