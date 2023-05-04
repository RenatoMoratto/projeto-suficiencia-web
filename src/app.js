import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { db_connection_string, port } from "./constants/environment_vars.js";
import { userRouter } from "./routes/userRoute.js";

mongoose.set("strictQuery", true);

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

try {
	await mongoose.connect(db_connection_string);
	app.listen(port, console.log(`Server is listening on port ${port}`));
} catch (error) {
	console.error(error);
}
