export interface IPhoto {
	id: string;
	urls: {
		regular: string;
		thumb: string;
		small: string;
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
}
