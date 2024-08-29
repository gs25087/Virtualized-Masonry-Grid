export interface IPhoto {
	id: string;
	url: string;
	width: number;
	height: number;
	alt: string;
}

export interface IMasonryGridProps {
	photos: IPhoto[];
}

export interface IPhotoDetails extends IPhoto {
	title: string;
	description: string;
	author: string;
	date: string;
}
