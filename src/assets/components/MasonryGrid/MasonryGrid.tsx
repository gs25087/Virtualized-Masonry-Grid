import React, { useEffect, useMemo, useRef } from "react";
import { IMasonryGridProps, IPhoto } from "@/types";
import Photo from "@/assets/components/Photo/Photo";
import { Link } from "react-router-dom";
import { useColumnCalculations } from "@/hooks/useColumnCalculation";
import { useItemDimensions } from "@/hooks/useItemDimensions";
import { useItemPositioning } from "@/hooks/useItemPositioning";
import { useVisibleRange } from "@/hooks/useVisibleRange";

const MasonryGrid: React.FC<IMasonryGridProps> = ({
	photos,
	minColumnWidth,
	cellGap,
	overscanCount,
	containerSize,
	scrollTop,
	isLoading,
	onNeedMore,
}) => {
	const gridRef = useRef<HTMLDivElement>(null);

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

	const getVisibleRange = useVisibleRange(
		photos,
		getItemPosition,
		getItemHeight,
		scrollTop,
		containerSize.height,
		overscanCount
	);

	const visibleRange = useMemo(() => getVisibleRange(), [getVisibleRange]);
	const totalHeight = useMemo(
		() => getTotalHeight(columnCount),
		[getTotalHeight, columnCount, containerSize]
	);

	useEffect(() => {
		if (gridRef.current && totalHeight < containerSize.height && !isLoading) {
			onNeedMore();
		}
	}, [totalHeight, containerSize.height, onNeedMore, isLoading]);

	return (
		<div ref={gridRef}>
			{photos && photos.length > 0 && (
				<div
					className="relative"
					style={{ height: totalHeight }}
				>
					{renderVisiblePhotos(
						photos,
						visibleRange,
						getItemPosition,
						getItemHeight,
						columnWidth,
						containerSize
					)}
				</div>
			)}
		</div>
	);
};

const renderVisiblePhotos = (
	photos: IPhoto[],
	visibleRange: { start: number; end: number },
	getItemPosition: (index: number) => { top: number; left: number },
	getItemHeight: (index: number) => number,
	columnWidth: number,
	containerSize: { width: number; height: number }
) => {
	return photos
		.slice(visibleRange.start, visibleRange.end)
		.map((photo, index) => {
			const actualIndex = visibleRange.start + index;
			const { top, left } = getItemPosition(actualIndex);
			const height = getItemHeight(actualIndex);
			return (
				<Link
					to={`/photo/${photo.id}`}
					state={{ containerSize }}
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
						width={columnWidth}
					/>
				</Link>
			);
		});
};

export default MasonryGrid;
