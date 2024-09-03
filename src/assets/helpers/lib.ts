export function formatDate(isoString: string) {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	const date = new Date(isoString);
	return date.toLocaleDateString("en-US", options).replace(",", "");
}
