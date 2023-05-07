import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { db_connection_string, port } from "./constants/environment_vars.js";
import { userRouter } from "./routes/userRoute.js";
import { createDefaultUser } from "./controllers/user.js";
import redis from "redis";
import { redis_connection_string } from "./constants/environment_vars.js";

mongoose.set("strictQuery", true);

const app = express();

export const redisClient = redis.createClient({ url: redis_connection_string });

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

try {
	await mongoose.connect(db_connection_string);
	await createDefaultUser();

	await redisClient.connect();

	console.log(`Redis connected!`);

	app.listen(port, console.log(`Server is listening on port ${port}`));
} catch (error) {
	console.error(error);
}
