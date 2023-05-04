import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { isEmpty } from "../utils/stringUtils.js";
import { jwt_secret } from "../constants/environment_vars.js";

export const findAll = async (req, res) => {
	try {
		const users = await User.find();

		if (!users) {
			res.state(400).json({ message: "Users not found!" });
			return;
		}

		res.status(200).json(users);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
};

export const findUserById = async (req, res) => {
	const id = req.params.id;

	try {
		const user = await User.findById(id);

		if (!user) {
			res.state(400).json({ message: "User not found!" });
			return;
		}

		res.status(200).json(user);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
};

export const authenticate = async (req, res) => {
	const { email, password } = req.body;

	if (isEmpty(email)) {
		return res.status(400).send({ message: "Email is required!" });
	}
	if (isEmpty(password)) {
		return res.status(400).send({ message: "Password is required!" });
	}

	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			return res.status(404).send({ message: "User not found!" });
		}

		const validatePassword = await bcrypt.compare(password, user.password);

		if (!validatePassword) {
			return res.status(401).send({ message: "Incorrect password!" });
		}

		const token = await jwt.sign({ id: user._id }, jwt_secret);

		res.status(200).send({ access_token: token });
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};
