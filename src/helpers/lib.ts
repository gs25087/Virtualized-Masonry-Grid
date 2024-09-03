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
//#endregion
type GenericFunction = (...args: unknown[]) => unknown;

export const debounce = <F extends GenericFunction>(
	func: F,
	wait: number
): ((...args: Parameters<F>) => void) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<F>): void => {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => func(...args), wait);
	};
};
