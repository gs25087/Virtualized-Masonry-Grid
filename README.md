# Photo Gallery Application

This project is an SPA that implements a photo gallery built with React and TypeScript, featuring a responsive, optimized, and virtualized masonry grid, detailed photo view, and a search functionality.

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```
   git clone git@github.com:gs25087/Virtualized-Masonry-Grid.git
   ```

2. Navigate to the project directory:

   ```
   cd Virtualized-Masonry-Grid
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Project

To start the development server, run:

```
npm start
```

Open [http://localhost:5174/](http://localhost:5174/) to view it in the browser.

### Building for Production

To create a production build, run:

```
npm run build
```

This builds the app for production to the `build` folder.

## Design Decisions

1. **Component Structure**: The application is divided into reusable components (App, AppContent, MasonryGrid, PhotoDetails, Form) to promote modularity and maintainability.

2. **Custom Hooks**: I've implemented several custom hooks (usePhotoFetching, useContainerSize, useColumnCalculations, etc.) to encapsulate and reuse complex logic.

3. **Masonry Grid Layout**: A custom masonry grid layout was implemented for an aesthetically pleasing photo display that efficiently uses space.

4. **Infinite Scrolling**: Instead of pagination, I use infinite scrolling to provide a seamless browsing experience.

5. **Responsive Design**: The application adjusts the number of columns based on the container width, ensuring a good user experience across different device sizes.

6. **Search Functionality**: A search feature allows users to find specific photos based on keywords.

7. **React Router**: Used for navigation between the photo grid and individual photo views, enabling a smooth single-page application experience.

## Performance Considerations

1. **Virtual Scrolling**: Only photos that are currently visible (plus a small overscan area) are rendered, significantly reducing the number of DOM elements.

2. **Memoization**: React's `useMemo` hook is used to memoize expensive calculations, preventing unnecessary re-computations.

3. **Debouncing**: Implemented for the resize event listener to prevent excessive calculations during window resizing.

4. **Lazy Loading**: Images are lazy-loaded as they come into view, reducing initial load time and bandwidth usage.

5. **Optimized Re-renders**: Careful management of component props and state minimizes unnecessary re-renders.

6. **Scroll Position Preservation**: The scroll position is preserved when navigating between the grid and individual photos, enhancing the user experience.

## Tools and Techniques Used

- React and TypeScript for building a robust and type-safe application
- React Router for handling navigation
- Custom hooks for logic encapsulation and reuse
- Unsplash API for fetching high-quality photos

## Future Improvements

1. Implement caching to reduce API calls and improve load times for previously viewed photos.
2. Add unit and integration tests to ensure reliability and ease of maintenance.
3. Implement live search functionality to provide real-time results as the user types.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
