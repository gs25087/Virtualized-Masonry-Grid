import { useCallback } from "react";

export const useItemPositioning = (
	columnCount: number,
	columnWidth: number,
	getItemHeight: (index: number) => number,
	cellGap: number
) => {
	return useCallback(
		(index: number) => {
			const columnHeights = new Array(columnCount).fill(0);
			let column = 0;
			let top = 0;

			for (let i = 0; i <= index; i++) {
				if (i === index) {
					column = columnHeights.indexOf(Math.min(...columnHeights));
					top = columnHeights[column];
				}
				const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
				columnHeights[shortestColumn] += getItemHeight(i) + cellGap;
			}

			const left = column * (columnWidth + cellGap);
			return { top, left };
		},
		[columnCount, columnWidth, cellGap, getItemHeight, cellGap]
	);
};
