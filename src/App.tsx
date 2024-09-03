import { FC, useRef, useState, useCallback, useEffect, FormEvent } from "react";
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
import { IAppContentProps } from "./types";
import Form from "./assets/components/Form/Form";

const AppContent: FC<IAppContentProps> = ({
	appContainerRef,
	containerSize,
	scrollPosition,
	setScrollPosition,
}) => {
	const location = useLocation();

	const [searchQuery, setSearchQuery] = useState<string>("garden");

	const { photos, isLoading, error, fetchMorePhotos, resetPhotos } =
		usePhotoFetching(searchQuery, 10);

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const query = formData.get("search") as string;
		setSearchQuery(query);
		resetPhotos();
		setScrollPosition(0);
	};

	const handleScroll = useCallback(() => {
		if (appContainerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = appContainerRef.current;
			if (location.pathname === "/") setScrollPosition(scrollTop);

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
			if (location.pathname === "/")
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
							<Form
								searchQuery={searchQuery}
								handleSearch={handleSearch}
								isLoading={isLoading}
							/>
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
								onNeedMore={fetchMorePhotos}
								isLoading={isLoading}
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

const App: FC = () => {
	const appContainerRef = useRef<HTMLDivElement>(null);
	const { containerSize } = useContainerSize(appContainerRef);
	const [scrollPosition, setScrollPosition] = useState<number>(0);

	return (
		<Router>
			<AppContent
				appContainerRef={appContainerRef}
				containerSize={containerSize}
				scrollPosition={scrollPosition}
				setScrollPosition={setScrollPosition}
			/>
		</Router>
	);
};

const LoadingIndicator: FC<{
	isLoading: boolean;
	dataLength: number;
}> = ({ isLoading, dataLength }) =>
	isLoading &&
	dataLength === 0 && <div className="text-lg  p-4">Loading...</div>;

const ErrorDisplay: FC<{ error: string | null }> = ({ error }) =>
	error && <div className="text-lg  text-red-600 p-4">{error}</div>;

const NoPhotosIndicator: FC<{ showIndicator: boolean }> = ({ showIndicator }) =>
	showIndicator && <div className="p-4">No photos available</div>;

export default App;
