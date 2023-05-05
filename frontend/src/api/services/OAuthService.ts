import { isAxiosError } from "axios";
import { api } from "../core/api";
import { OAuthDto } from "../models/OAuthDto";
import { OAuthResponse } from "../models/OAuthResponse";

export class OAuthService {
	public static validate(product: OAuthDto): Map<string, string> {
		const errors: Map<string, string> = new Map();

		if (!product.email) {
			errors.set("email", "Email is required.");
		}
		if (!product.password) {
			errors.set("password", "Password is required.");
		}

		return errors;
	}

	public static async login(data: OAuthDto): Promise<OAuthResponse> {
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
