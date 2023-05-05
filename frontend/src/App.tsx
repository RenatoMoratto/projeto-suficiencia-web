import { Login } from "./pages/Login";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
	const [token, setToken] = useLocalStorage("pwfs.token", null);

	const isLoggedIn = !!token;

	const loginHandler = (token: string) => {
		setToken(token);
	};

	if (isLoggedIn) {
		return <div>Home</div>;
	}

	return <Login onLogin={loginHandler} />;
}

export default App;
