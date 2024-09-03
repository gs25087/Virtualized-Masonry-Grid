import React, { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoDetails from "./assets/components/PhotoDetails/PhotoDetails";
import MasonryGrid from "./assets/components/MasonryGrid/MasonryGrid";
import { api } from "./config/apiConfig";
import { IPhoto } from "./types";

const PER_PAGE = 10;

const App: React.FC = () => {
	const [data, setPhotosResponse] = useState<IPhoto[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const initialFetchDone = useRef<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const masonryGridRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);

	const fetchPhotos = useCallback(async () => {
		if (isLoading || !hasMore) return;

		setLoading(true);
		setError(null);

		try {
			console.log("Fetching photos...");

			const result = await api.search.getPhotos({
				query: "garden",
				page: pageNumber,
				perPage: PER_PAGE,
			});

			const newPhotos = result?.response?.results || [];

			setPhotosResponse((prevPhotos) => [...prevPhotos, ...newPhotos]);
			setPageNumber((prev) => prev + 1);
			setHasMore(newPhotos.length === PER_PAGE);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	}, [pageNumber, isLoading, hasMore]);

	useEffect(() => {
		if (!initialFetchDone.current) {
			fetchPhotos();
			initialFetchDone.current = true;
		}
	}, []);

	const handleScroll = useCallback((scrollTop: number) => {
		setScrollPosition(scrollTop);
	}, []);

	return (
		<Router>
			<div className="p-8 max-w-3xl mx-auto">
				<Routes>
					<Route
						path="/"
						element={
							<>
								{isLoading && data.length === 0 && (
									<div className="text-lg font-semibold p-4">Loading...</div>
								)}
								{error && (
									<div className="text-lg font-semibold text-red-600 p-4">{error}</div>
								)}
								<MasonryGrid
									photos={data}
									masonryGridRef={masonryGridRef}
									minColumnWidth={180}
									cellGap={10}
									initialScrollPosition={scrollPosition}
									overscanCount={0}
									onLoadMore={fetchPhotos}
									isLoading={isLoading}
									onScroll={handleScroll}
								/>
								{!data.length && !isLoading && !error && <div>No photos available</div>}
							</>
						}
					/>
					<Route
						path="/photo/:id"
						element={<PhotoDetails data={data || []} />}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
