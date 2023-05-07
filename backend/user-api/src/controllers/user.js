import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { isEmpty } from "../utils/stringUtils.js";
import { jwt_secret } from "../constants/environment_vars.js";
import { channel, redisClient } from "../app.js";

export const findAll = async (req, res) => {
	try {
		const users = await User.find();

		if (!users) {
			res.state(400).json({ message: "Users not found!" });
			return;
		}

		await redisClient.set("users", JSON.stringify(users), {
			EX: 120, // 2 minutes
			NX: true,
		});

		res.status(200).json({ fromCache: false, data: users });
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

		res.status(200).send({ access_token: token, token_type: "Bearer" });
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};

export const create = async (req, res) => {
	const { name, email, password } = req.body;

	if (isEmpty(name)) {
		return res.status(400).send({ message: "Name is required!" });
	}
	if (isEmpty(email)) {
		return res.status(400).send({ message: "Email is required!" });
	}
	if (isEmpty(password)) {
		return res.status(400).send({ message: "Password is required!" });
	}

	try {
		const userExists = await User.findOne({ email: email });

		if (userExists) {
			return res.status(400).send({ message: "Email already in use!" });
		}

		channel.sendToQueue("USER", Buffer.from(JSON.stringify({ name, email, password })));

		redisClient.del("users");

		res.status(200).json({ message: "User register with success!" });
	} catch (error) {
		console.error(error);
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};
