import { Login } from "./pages/Login";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Users } from "./pages/Users";

function App() {
	const [token, setToken] = useLocalStorage("pwfs.token", null);

	const isLoggedIn = !!token;

	const loginHandler = (token: string) => {
		setToken(token);
	};

	const logoutHandler = () => {
		setToken(null);
	};

	if (isLoggedIn) {
		return <Users token={token} onLogout={logoutHandler} />;
	}

	return <Login onLogin={loginHandler} />;
}

export default App;
