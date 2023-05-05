import { isAxiosError } from "axios";
import { api } from "../core/api";
import { OAuthCreateRequest } from "../models/OAuthCreateRequest";
import { OAuthResponse } from "../models/OAuthResponse";

export class OAuthService {
	public static validate(userData: OAuthCreateRequest): Map<string, string> {
		const errors: Map<string, string> = new Map();

		if (!userData.email) {
			errors.set("email", "Email is required.");
		}
		if (!userData.password) {
			errors.set("password", "Password is required.");
		}

		return errors;
	}

	public static async login(data: OAuthCreateRequest): Promise<OAuthResponse> {
		try {
			const response = await api.post<OAuthResponse>("/user/oauth", data);

			return response.data;
		} catch (error) {
			console.log(error);
			if (isAxiosError(error)) {
				throw error.response?.data.message;
			}
			throw "Login failed";
		}
	}
}
