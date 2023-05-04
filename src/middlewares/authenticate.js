import jwt from "jsonwebtoken";
import { jwt_secret } from "../constants/environment_vars.js";

export const verifyToken = (req, res, next) => {
	const authorization = req.headers.authorization;
	const token = authorization?.split(" ")[1];

	console.log(token);

	if (!token) {
		return res.status(401).send({ message: "Unauthorized: Access token is missing." });
	}

	try {
		jwt.verify(token, jwt_secret);
		next();
	} catch (error) {
		res.status(400).send({ message: "Invalid access token!" });
	}
};
