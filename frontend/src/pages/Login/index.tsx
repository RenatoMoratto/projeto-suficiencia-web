import { FormEvent, useState } from "react";
import { OAuthCreateRequest } from "../../api/models/OAuthCreateRequest";
import { OAuthService } from "../../api/services/OAuthService";
import Input from "../../components/Input";
import Message from "../../components/Message";
import styles from "./login.module.css";

interface LoginProps {
	onLogin: (token: string) => void;
}

export function Login({ onLogin }: LoginProps) {
	const loginInitialValue: OAuthCreateRequest = {
		email: "",
		password: "",
	};

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userData, setUserData] = useState<OAuthCreateRequest>(loginInitialValue);
	const [errors, setErrors] = useState<Map<string, string>>(new Map());
	const [errorMessage, setErrorMessage] = useState<string>("");

	const changeHandler = (e: { target: { name: string; value: string } }) => {
		console.log(e.target.name);
		setUserData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();

		setErrors(new Map());
		setErrorMessage("");

		const errors = OAuthService.validate(userData);

		if (errors.size > 0) {
			setErrors(errors);
			return;
		}

		setIsLoading(true);

		try {
			const response = await OAuthService.login(userData);

			onLogin(`${response.token_type} ${response.access_token}`);
		} catch (e) {
			setErrorMessage(String(e));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className={styles.main}>
			<h2>Welcome</h2>
			<form onSubmit={submitHandler}>
				<Input
					value={userData.email}
					onChange={changeHandler}
					id="email"
					label="E-mail"
					autoComplete="email"
					type="email"
					errorMessage={errors.get("email")}
					isInvalid={!!errors.get("email")}
				/>
				<Input
					value={userData.password}
					onChange={changeHandler}
					id="password"
					label="Password"
					autoComplete="current-password"
					type="password"
					errorMessage={errors.get("password")}
					isInvalid={!!errors.get("password")}
				/>
				{errorMessage.length > 0 && <Message>{errorMessage}</Message>}
				<button disabled={isLoading} className="btn" type="submit">
					{isLoading ? "Loading..." : "Login"}
				</button>
			</form>
		</main>
	);
}
