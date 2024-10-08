export interface IPhoto {
	id: string;
	urls: {
		regular: string;
		thumb: string;
		small: string;
	};
	links: {
		html: string;
		download_location: string;
	};
	width: number;
	height: number;
	alt_description: string | null;
	description: string | null;
	user: {
		first_name: string;
		last_name: string | null;
	};
	created_at: string;
}

interface IPhotoProps {
	photo: IPhoto;
	width: number;
}

export interface IPhotoDetailsProps {
	data: IPhoto[];
}

export interface IMasonryGridProps {
	photos: IPhoto[];
	minColumnWidth: number;
	cellGap: number;
	overscanCount: number;
	scrollTop: number;
	containerSize: {
		width: number;
		height: number;
	};
	isLoading: boolean;
	onNeedMore: () => void;
}

export interface IAppContentProps {
	appContainerRef: React.RefObject<HTMLDivElement>;
	containerSize: {
		width: number;
		height: number;
	};
	scrollPosition: number;
	setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

export interface IFormProps {
	handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
	searchQuery: string;
	isLoading: boolean;
}
