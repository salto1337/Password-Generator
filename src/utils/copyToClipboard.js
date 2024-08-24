export function copyToClipboard(inputValue) {
	if (inputValue) {
		navigator.clipboard.writeText(inputValue);
	}
}
