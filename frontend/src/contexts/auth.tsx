import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthProviderProps {
	children?: JSX.Element;
}

interface AuthContextInterface {
	token: string;
	isLoggedIn: Boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
	token: "",
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useLocalStorage("pwfs.token", null);

	const isLoggedIn = !!token;

	const loginHandler = (token: string) => {
		setToken(token);
	};

	const logoutHandler = () => {
		setToken(null);
	};

	const contextValue: AuthContextInterface = useMemo(
		() => ({
			token,
			isLoggedIn,
			login: loginHandler,
			logout: logoutHandler,
		}),
		[token, isLoggedIn]
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
