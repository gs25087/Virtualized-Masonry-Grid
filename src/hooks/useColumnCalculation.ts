export const useColumnCalculations = (
	width: number,
	minColumnWidth: number,
	gap: number
) => {
	/* Todo add memo */
	const columnCount = Math.floor(width / (minColumnWidth + gap));
	const columnWidth = width / columnCount - gap;

	return { columnCount, columnWidth };
};
