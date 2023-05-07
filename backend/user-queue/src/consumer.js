import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import amqp from "amqplib";
import {
	db_connection_string,
	port,
	default_user,
	rabbit_host,
	rabbit_port,
	rabbit_user,
	rabbit_password,
} from "./constants/environment_vars.js";
import { User } from "./models/User.js";

mongoose.set("strictQuery", true);

const app = express();

let connection, channel;

try {
	await mongoose.connect(db_connection_string);

	await createDefaultUser();

	app.listen(port, console.log(`User Queue is listening on port ${port}`));
} catch (error) {
	console.log("User Queue could not connect to the database! Exiting now...", error);
}

connectRabbitMQ();

async function connectRabbitMQ() {
	try {
		connection = await amqp.connect({
			hostname: rabbit_host,
			port: rabbit_port,
			username: rabbit_user,
			password: rabbit_password,
		});

		channel = await connection.createChannel();

		await channel.assertQueue("USER");

		channel.consume("USER", data => {
			const newUser = JSON.parse(data.content);
			console.log("Creating user:" + newUser);

			createUser(newUser);

			channel.ack(data);
		});
	} catch (error) {
		console.log("User Queue could not connect to rabbitmq!", error);
	}
}

async function createUser(user) {
	try {
		const hashPassword = await bcrypt.hash(user.password, 10);
		const newUser = { name: user.name, email: user.email, password: hashPassword };

		User.create(newUser);
	} catch (error) {
		console.error(error);
	}
}

async function createDefaultUser() {
	try {
		const userExists = await User.findOne({ email: default_user.email });

		if (!userExists) {
			await createUser(default_user);
		}
	} catch (error) {
		console.log(error);
	}
}
