import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import amqp from "amqplib";
import { db_connection_string, port, rabbit_connection_string } from "./constants/environment_vars.js";
import { User } from "./models/User.js";

mongoose.set("strictQuery", true);

const app = express();

let connection, channel;

try {
	await mongoose.connect(db_connection_string);
	await createDefaultUser();

	await connectRabbitMQ();

	channel.consume("USER", data => {
		const newUser = JSON.parse(data.content);
		console.log("Creating user:" + newUser);

		createUser(newUser);

		channel.ack(data);
	});

	app.listen(port, console.log(`User Queue is listening on port ${port}`));
} catch (error) {
	console.log("User Queue could not connect to the database! Exiting now...", error);
}

async function connectRabbitMQ() {
	try {
		connection = await amqp.connect(rabbit_connection_string);
		channel = await connection.createChannel();
		await channel.assertQueue("USER");
	} catch (error) {
		console.log(error);
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

async function createDefaultUser() {
	try {
		const hashPassword = await bcrypt.hash(default_user.password, 10);
		const user = { name: default_user.name, email: default_user.email, password: hashPassword };

		await User.create(user);
		console.log("Default user inserted successfully!");
	} catch (error) {
		console.log("Error when inserting default user: " + error);
	}
}
