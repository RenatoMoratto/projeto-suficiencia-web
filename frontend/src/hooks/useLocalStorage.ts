import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = (key: string, defaultValue: string | null) => {
	const retrieveFromStorage = useCallback(() => {
		let currentValue;

		try {
			currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
		} catch (error) {
			currentValue = defaultValue;
		}

		return currentValue;
	}, []);

	const [value, setValue] = useState(retrieveFromStorage);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};
