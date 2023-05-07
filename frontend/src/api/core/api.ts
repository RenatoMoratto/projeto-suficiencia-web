import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.API_BASE_URL ?? "http://localhost:8181",
	headers: {
		"Content-type": "application/json",
	},
});
