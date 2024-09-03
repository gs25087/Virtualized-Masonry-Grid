import { IPhoto } from "@/types";
import { useCallback } from "react";

export const useVisibleRange = (
	photos: IPhoto[],
	getItemPosition: (index: number) => { top: number; left: number },
	getItemHeight: (index: number) => number,
	scrollTop: number,
	containerHeight: number,
	overscanCount: number
) => {
	return useCallback(() => {
		const startIndex = photos.findIndex((_, index) => {
			const { top } = getItemPosition(index);
			return (
				top + getItemHeight(index) > scrollTop - overscanCount * containerHeight
			);
		});

		const endIndex = photos.findIndex((_, index) => {
			const { top } = getItemPosition(index);
			return top > scrollTop + containerHeight + overscanCount * containerHeight;
		});

		return {
			start: Math.max(0, startIndex),
			end: endIndex === -1 ? photos.length : endIndex,
		};
	}, [
		photos,
		getItemPosition,
		getItemHeight,
		scrollTop,
		containerHeight,
		overscanCount,
	]);
};
