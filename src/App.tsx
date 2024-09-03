import { FC, useRef, useState, useCallback, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import PhotoDetails from "./assets/components/PhotoDetails/PhotoDetails";
import MasonryGrid from "./assets/components/MasonryGrid/MasonryGrid";
import { usePhotoFetching } from "./hooks/usePhotoFetching";
import { useContainerSize } from "./hooks/useContainerSize";

const AppContent: FC = () => {
	const appContainerRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const { containerSize } = useContainerSize(appContainerRef);
	const location = useLocation();

	const { photos, isLoading, error, fetchMorePhotos } = usePhotoFetching(
		"garden",
		10
	);

	const handleScroll = useCallback(() => {
		if (appContainerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = appContainerRef.current;
			setScrollPosition(scrollTop);

			if (
				scrollHeight - scrollTop - clientHeight < clientHeight * 0.5 &&
				!isLoading &&
				location.pathname === "/"
			) {
				fetchMorePhotos();
			}
		}
	}, [isLoading, fetchMorePhotos, location.pathname]);

	useEffect(() => {
		const appContainer = appContainerRef.current;
		if (appContainer) {
			appContainer.addEventListener("scroll", handleScroll);
			return () => appContainer.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll]);

	useEffect(() => {
		if (appContainerRef.current) {
			appContainerRef.current.scrollTop = scrollPosition;
		}
	}, [location]);

	return (
		<div
			ref={appContainerRef}
			className="h-screen overflow-y-auto "
		>
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
								minColumnWidth={180}
								cellGap={10}
								overscanCount={2}
								containerSize={containerSize}
								scrollTop={scrollPosition}
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
	);
};

const App: FC = () => (
	<Router>
		<AppContent />
	</Router>
);

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
