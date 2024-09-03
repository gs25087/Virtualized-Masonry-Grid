import { useMemo } from "react";

export const useColumnCalculations = (
	width: number,
	minColumnWidth: number,
	gap: number
) => {
	return useMemo(() => {
		const columnCount = Math.max(
			1,
			Math.floor((width + gap) / (minColumnWidth + gap))
		);
		const columnWidth = (width - (columnCount - 1) * gap) / columnCount;

		return { columnCount, columnWidth };
	}, [width, minColumnWidth, gap]);
};
