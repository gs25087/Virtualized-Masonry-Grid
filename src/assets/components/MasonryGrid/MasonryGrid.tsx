import React, { useCallback, useEffect, useRef, useState } from "react";
import { IMasonryGridProps } from "@/types";
import Photo from "../Photo/Photo";
import { Link } from "react-router-dom";
import { useContainerSize } from "../../../hooks/useContainerSize";
import { useColumnCalculations } from "../../../hooks/useColumnCalculation";
import { useItemDimensions } from "../../../hooks/useItemDimensions";
import { useItemPositioning } from "../../../hooks/useItemPositioning";
import { useVisibleRange } from "../../../hooks/useVisibleRange";

const MasonryGrid: React.FC<IMasonryGridProps> = ({
	photos,
	masonryGridRef,
	minColumnWidth,
	cellGap,
	initialScrollPosition,
	overscanCount,
	onScroll,
	onLoadMore,
	isLoading,
}) => {
	const [scrollTop, setScrollTop] = useState(initialScrollPosition);
	const totalHeightRef = useRef(0);

	const { containerSize } = useContainerSize(masonryGridRef);

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

	const handleScroll = useCallback(() => {
		if (masonryGridRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = masonryGridRef.current;
			setScrollTop(scrollTop);
			onScroll(scrollTop);

			if (
				scrollHeight - scrollTop - clientHeight < clientHeight * 0.5 &&
				!isLoading
			) {
				onLoadMore();
			}
		}
	}, [onLoadMore, isLoading, onScroll]);

	useEffect(() => {
		const masonryGrid = masonryGridRef.current;
		if (masonryGrid) {
			masonryGrid.addEventListener("scroll", handleScroll);
			masonryGrid.scrollTop = initialScrollPosition;
			return () => masonryGrid.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll, initialScrollPosition, photos]);

	const checkAndLoadMore = useCallback(() => {
		if (
			masonryGridRef.current &&
			totalHeightRef.current < containerSize.height &&
			!isLoading
		) {
			onLoadMore();
		}
	}, [containerSize, onLoadMore, isLoading]);

	useEffect(() => {
		checkAndLoadMore();
	}, [checkAndLoadMore, photos]);

	const visibleRange = getVisibleRange();
	const totalHeight = getTotalHeight(columnCount);
	totalHeightRef.current = totalHeight;

	return (
		<div
			ref={masonryGridRef}
			className="h-[calc(100vh-2rem)] overflow-auto"
		>
			<h1 className="text-2xl font-bold mb-4">Photo Grid</h1>
			{photos && photos.length > 0 && (
				<div className="relative ">
					{photos.slice(visibleRange.start, visibleRange.end).map((photo, index) => {
						const actualIndex = visibleRange.start + index;
						const { top, left } = getItemPosition(actualIndex);
						const height = getItemHeight(actualIndex);
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
									width={columnWidth}
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
