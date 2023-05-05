import { Login } from "./pages/Login";
import { Users } from "./pages/Users";
import { useContext } from "react";
import AuthContext from "./contexts/auth";

function App() {
	const { isLoggedIn } = useContext(AuthContext);

	if (isLoggedIn) {
		return <Users />;
	}

	return <Login />;
}

export default App;
