import { FormEvent, useContext, useState } from "react";
import { Modal } from "../Modal";
import { UserCreateRequest } from "../../api/models/UserCreateRequest";
import { UserService } from "../../api/services/UserService";
import AuthContext from "../../contexts/auth";
import Input from "../Input";
import Message from "../Message";

interface NewUserModalProps {
	onClose: () => void;
}

const userInitialValue: UserCreateRequest = {
	name: "",
	email: "",
	password: "",
};

export function NewUserModal({ onClose }: NewUserModalProps) {
	const { token } = useContext(AuthContext);

	const [user, setUser] = useState(userInitialValue);
	const [errors, setErrors] = useState<Map<string, string>>(new Map());
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isCreated, setIsCreated] = useState<boolean>(false);

	const changeHandler = (e: { target: { name: string; value: string } }) => {
		setUser(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();

		setIsCreated(false);
		setErrors(new Map());
		setErrorMessage("");

		const errors = UserService.validate(user);

		if (errors.size > 0) {
			setErrors(errors);
			return;
		}

		setIsLoading(true);

		try {
			await UserService.create(user, token);
			setIsCreated(true);

			setTimeout(onClose, 300);
		} catch (e) {
			setErrorMessage(String(e));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal onClose={onClose}>
			<h2>New User</h2>
			<form onSubmit={submitHandler}>
				<Input
					value={user.name}
					onChange={changeHandler}
					id="name"
					label="Name"
					type="name"
					errorMessage={errors.get("name")}
					isInvalid={!!errors.get("name")}
				/>
				<Input
					value={user.email}
					onChange={changeHandler}
					id="email"
					label="E-mail"
					type="email"
					errorMessage={errors.get("email")}
					isInvalid={!!errors.get("email")}
				/>
				<Input
					value={user.password}
					onChange={changeHandler}
					id="password"
					label="Password"
					type="password"
					errorMessage={errors.get("password")}
					isInvalid={!!errors.get("password")}
				/>
				{isCreated && <Message error={false}>User created with success!</Message>}
				{errorMessage.length > 0 && <Message>{errorMessage}</Message>}
				<div className="actions">
					<button disabled={isLoading} type="submit">
						{isLoading ? "Loading..." : "Save"}
					</button>
					<button disabled={isLoading} type="button" onClick={onClose}>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
}
