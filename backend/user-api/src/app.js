import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import redis from "redis";
import amqp from "amqplib";
import {
	db_connection_string,
	port,
	rabbit_host,
	rabbit_port,
	rabbit_user,
	rabbit_password,
} from "./constants/environment_vars.js";
import { userRouter } from "./routes/userRoute.js";
import { redis_connection_string } from "./constants/environment_vars.js";

mongoose.set("strictQuery", true);

const app = express();

export const redisClient = redis.createClient({ url: redis_connection_string });

export let channel;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

try {
	await mongoose.connect(db_connection_string);

	await redisClient.connect();

	console.log(`Redis connected!`);

	await connectRabbitMQ();

	app.listen(port, console.log(`Server is listening on port ${port}`));
} catch (error) {
	console.error(error);
}

async function connectRabbitMQ() {
	try {
		const connection = await amqp.connect({
			hostname: rabbit_host,
			port: rabbit_port,
			username: rabbit_user,
			password: rabbit_password,
		});

		channel = await connection.createChannel();
	} catch (error) {
		throw "User Queue could not connect to rabbitmq!" + error;
	}
}
