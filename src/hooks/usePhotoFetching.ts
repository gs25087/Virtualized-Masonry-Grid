import { useState, useCallback, useRef, useEffect } from "react";
import { IPhoto } from "@/types";
import { api } from "@/config/apiConfig";

export const usePhotoFetching = (query: string, perPage: number) => {
	const [photos, setPhotos] = useState<IPhoto[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const initialFetchDone = useRef<boolean>(false);

	const fetchPhotos = useCallback(async () => {
		if (isLoading || !hasMore) return;

		setLoading(true);
		setError(null);

		try {
			const result = await api.search.getPhotos({
				query,
				page: pageNumber,
				perPage,
			});

			if (result?.response) {
				const newPhotos = result.response.results || [];
				setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
				setPageNumber((prev) => prev + 1);
				setHasMore(newPhotos.length === perPage);
			} else {
				throw new Error("No response from API");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	}, [query, pageNumber, perPage, isLoading, hasMore]);

	useEffect(() => {
		setPhotos([]);
		setPageNumber(1);
		setHasMore(true);
	}, [query]);

	useEffect(() => {
		if (!initialFetchDone.current) {
			fetchPhotos();
			initialFetchDone.current = true;
		}
	}, [fetchPhotos]);

	return {
		photos,
		isLoading,
		error,
		hasMore,
		fetchMorePhotos: fetchPhotos,
	};
};
