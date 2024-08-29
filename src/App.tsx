import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoDetails from "./assets/components/PhotoDetails/PhotoDetails";
import MasonryGrid from "./assets/components/MasonryGrid/MasonryGrid";

const App: React.FC = () => {
	return (
		<Router>
			<div className="p-8 max-w-3xl mx-auto">
				<div className="border p-4">
					<Routes>
						<Route
							path="/"
							element={<MasonryGrid />}
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
