import { useContext, useEffect, useState } from "react";
import Message from "../../components/Message";
import styles from "./users.module.css";
import { UserService } from "../../api/services/UserService";
import { UserResponse } from "../../api/models/UserResponse";
import { UserTable } from "../../components/UserTable";
import AuthContext from "../../contexts/auth";
import { NewUserModal } from "../../components/NewUserModal";

export function Users() {
	const { token, logout } = useContext(AuthContext);

	const [modalIsShow, setModalIsShow] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [users, setUsers] = useState<Array<UserResponse>>([]);

	const showModal = () => {
		setModalIsShow(true);
	};

	const hideModal = () => {
		setModalIsShow(false);
	};

	const fetchUsers = async () => {
		try {
			setIsLoading(true);
			const users = await UserService.getAll(token);

			setUsers(users);
		} catch (e) {
			setUsers([]);
			setErrorMessage(String(e));
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<main>
			{modalIsShow && <NewUserModal onClose={hideModal} />}
			<section className={styles.title}>
				<div>
					<h2>Users</h2>
					<button onClick={fetchUsers}>Buscar</button>
				</div>
				<div className="actions">
					<button onClick={logout}>Logout</button>
					<button onClick={showModal}>New User</button>
				</div>
			</section>
			{errorMessage.length > 0 && <Message>{errorMessage}</Message>}
			<UserTable users={users} loading={isLoading} />
		</main>
	);
}
