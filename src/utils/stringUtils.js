export const isEmpty = text => {
	if (typeof text === "string") {
		return text.trim().length === 0;
	}
	for (let prop in text) {
		if (text.hasOwnProperty(prop)) return false;
	}
	return true;
};
