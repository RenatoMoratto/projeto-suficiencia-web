import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import amqp from "amqplib";
import { db_connection_string, port, default_user, rabbit_host, rabbit_port } from "./constants/environment_vars.js";
import { User } from "./models/User.js";

mongoose.set("strictQuery", true);

const app = express();

let connection, channel;

try {
	await mongoose.connect(db_connection_string);

	await createUser(default_user);

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
	} catch (err) {
		console.log(err);
	}
}
