import { createApi } from "unsplash-js";

export const api = createApi({
	accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});
