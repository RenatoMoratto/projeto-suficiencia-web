import { redisClient } from "../app.js";

export async function cacheUsersData(req, res, next) {
	try {
		const cacheResults = await redisClient.get("users");

		if (cacheResults) {
			const results = JSON.parse(cacheResults);

			res.status(200).send({
				fromCache: true,
				data: results,
			});
		} else {
			next();
		}
	} catch (error) {
		res.status(404);
	}
}
