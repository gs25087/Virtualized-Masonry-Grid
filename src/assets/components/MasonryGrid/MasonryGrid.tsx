import React from "react";
import { IPhoto, IMasonryGridProps } from "@/types";
import Photo from "../Photo/Photo";
import { Link } from "react-router-dom";
import { useContainerSize } from "../../../hooks/useContainerSize";
import { useColumnCalculations } from "../../../hooks/useColumnCalculation";
import { useItemDimensions } from "../../../hooks/useItemDimensions";
import { useItemPositioning } from "../../../hooks/useItemPositioning";

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

	const getItemPosition = useItemPositioning(
		columnCount,
		columnWidth,
		getItemHeight,
		cellGap
	);

	return (
		<div ref={masonryGridRef}>
			<h1 className="text-2xl font-bold mb-4">Photo Grid</h1>
			{photos && photos.length > 0 && (
				<div className="relative">
					{photos.map((photo, index) => {
						const { top, left } = getItemPosition(index);
						const height = getItemHeight(index);
						return (
							<Link
								to={`/photo/${photo.id}`}
								key={photo.id}
								className="mb-4"
								style={{
									position: "absolute",
									cursor: "pointer",
									top,
									left,
									width: columnWidth,
									height,
								}}
							>
								<Photo
									photo={photo}
									width={300}
								/>
							</Link>
						);
					})}
				</div>
			)}
			<div></div>
		</div>
	);
};

export default MasonryGrid;
