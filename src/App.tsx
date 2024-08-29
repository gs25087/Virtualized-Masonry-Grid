import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoDetails from "./assets/components/PhotoDetails/PhotoDetails";
import MasonryGrid from "./assets/components/MasonryGrid/MasonryGrid";
import { IApiResponse } from "./types";
import { api } from "./config/apiConfig";

const App: React.FC = () => {
	const [data, setPhotosResponse] = useState<IApiResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				const result = await api.search.getPhotos({ query: "panda" });
				setPhotosResponse(result as IApiResponse);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchPhotos();
	}, []);

	const LoadingMessage = <div className="text-lg font-semibold">Loading...</div>;

	const ErrorMessage = (
		<div className="text-lg font-semibold text-red-600">{error}</div>
	);

	const getHomeElement = () => {
		if (loading) return LoadingMessage;
		if (error) return ErrorMessage;
		if (data?.response.results)
			return <MasonryGrid photos={data.response.results} />;
		return <div>No photos available</div>;
	};

	return (
		<Router>
			<div className="p-8 max-w-3xl mx-auto">
				<div className="border p-4">
					<Routes>
						<Route
							path="/"
							element={getHomeElement()}
						/>
						<Route
							path="/photo/:id"
							element={<PhotoDetails />}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
