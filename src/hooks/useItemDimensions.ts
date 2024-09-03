import { useCallback, useMemo } from "react";

interface Photo {
	width: number;
	height: number;
}

interface ItemDimensions {
	getItemHeight: (index: number) => number;
	getTotalHeight: (columnCount: number) => number;
}

export const useItemDimensions = (
	photos: Photo[],
	columnWidth: number,
	cellGap: number
): ItemDimensions => {
	const getItemHeight = useCallback(
		(index: number) => {
			const photo = photos[index];
			const aspectRatio = photo.width / photo.height;
			return Math.floor(columnWidth / aspectRatio);
		},
		[photos, columnWidth]
	);

	const getColumnHeights = useCallback(
		(columnCount: number) => {
			const columnHeights = new Array(columnCount).fill(0);
			photos.forEach((_, index) => {
				const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
				columnHeights[shortestColumn] += getItemHeight(index) + cellGap;
			});
			return columnHeights;
		},
		[photos, getItemHeight, cellGap]
	);

	const getTotalHeight = useCallback(
		(columnCount: number) => {
			if (photos.length === 0) return 0;
			const columnHeights = getColumnHeights(columnCount);
			return Math.max(...columnHeights);
		},
		[getColumnHeights, photos.length]
	);

	return useMemo(
		() => ({
			getItemHeight,
			getTotalHeight,
		}),
		[getItemHeight, getTotalHeight]
	);
};
