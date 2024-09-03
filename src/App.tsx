import { FC, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoDetails from "./assets/components/PhotoDetails/PhotoDetails";
import MasonryGrid from "./assets/components/MasonryGrid/MasonryGrid";
import { usePhotoFetching } from "./hooks/usePhotoFetching";

const App: FC = () => {
	const masonryGridRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);

	const { photos, isLoading, error, fetchMorePhotos } = usePhotoFetching(
		"garden",
		5
	);

	const handleScroll = (scrollTop: number) => {
		setScrollPosition(scrollTop);
	};

	return (
		<Router>
			<div className="p-8 max-w-3xl mx-auto">
				<Routes>
					<Route
						path="/"
						element={
							<>
								<LoadingIndicator
									isLoading={isLoading}
									dataLength={photos.length}
								/>
								<ErrorDisplay error={error} />
								<MasonryGrid
									photos={photos}
									masonryGridRef={masonryGridRef}
									minColumnWidth={180}
									cellGap={10}
									initialScrollPosition={scrollPosition}
									overscanCount={0}
									onLoadMore={fetchMorePhotos}
									isLoading={isLoading}
									onScroll={handleScroll}
								/>
								<NoPhotosIndicator
									showIndicator={!photos.length && !isLoading && !error}
								/>
							</>
						}
					/>
					<Route
						path="/photo/:id"
						element={<PhotoDetails data={photos} />}
					/>
				</Routes>
			</div>
		</Router>
	);
};

const LoadingIndicator: FC<{
	isLoading: boolean;
	dataLength: number;
}> = ({ isLoading, dataLength }) =>
	isLoading &&
	dataLength === 0 && (
		<div className="text-lg font-semibold p-4">Loading...</div>
	);

const ErrorDisplay: FC<{ error: string | null }> = ({ error }) =>
	error && <div className="text-lg font-semibold text-red-600 p-4">{error}</div>;

const NoPhotosIndicator: FC<{ showIndicator: boolean }> = ({ showIndicator }) =>
	showIndicator && <div>No photos available</div>;

export default App;
