export interface IPhoto {
	id: string;
	urls: {
		thumb: string;
		small: string;
	};
	width: number;
	height: number;
	alt_description: string;
	description: string | null;
	user: {
		first_name: string;
		last_name: string;
	};
	created_at: string;
}

interface IPhotoProps {
	photo: IPhoto;
	width: number;
}

export interface IMasonryGridProps {
	photos: IPhoto[];
}

export interface IApiResponse {
	response: {
		results: IPhoto[];
		errors?: string[];
	};
}
