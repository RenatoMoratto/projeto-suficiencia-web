import { isAxiosError } from "axios";
import { UserResponse } from "./../models/UserResponse";
import { UserCreateRequest } from "../models/UserCreateRequest";
import { api } from "../core/api";

export class UserService {
	public static validate(user: UserCreateRequest): Map<string, string> {
		const errors: Map<string, string> = new Map();

		if (!user.name) {
			errors.set("name", "Name is required.");
		}
		if (!user.email) {
			errors.set("email", "Email is required.");
		}
		if (!user.password) {
			errors.set("password", "Password is required.");
		} else if (user.password.length < 6) {
			errors.set("password", "Password must have 6 or more characters.");
		}

		return errors;
	}

	public static async getAll(token: string): Promise<Array<UserResponse>> {
		try {
			const response = await api.get("/user/all", { headers: { Authorization: token } });

			return response.data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error.response?.data.message;
			}
			throw "Failed to load users";
		}
	}

	public static async create(data: UserCreateRequest, token: string): Promise<UserResponse> {
		try {
			const response = await api.post<UserResponse>("/user/new", data, { headers: { Authorization: token } });

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error.response?.data.message;
			}
			throw "Failed to create user";
		}
	}
}
