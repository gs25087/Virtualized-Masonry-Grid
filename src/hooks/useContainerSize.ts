import { RefObject, useCallback, useEffect, useState } from "react";

export const useContainerSize = (ref: RefObject<HTMLDivElement>) => {
	const [containerSize, setContainerSize] = useState({
		width: 0,
		height: 0,
	});

	const updateSize = useCallback(() => {
		if (ref.current) {
			const { width, height } = ref.current.getBoundingClientRect();
			setContainerSize({ width, height });
		}
	}, [ref]);

	useEffect(() => {
		updateSize();
		window.addEventListener("resize", updateSize);

		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, [updateSize]);

	return { containerSize, updateSize };
};
