export interface IPhoto {
	id: string;
	urls: {
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

export interface IMasonryGridProps {
	photos: IPhoto[];
}

export interface IApiResponse {
	response: {
		results: IPhoto[];
		errors?: string[];
	};
}
