import mongoose from "mongoose";

export const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
});
