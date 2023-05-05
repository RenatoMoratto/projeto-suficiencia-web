export async function cacheUsersData(req, res, next) {
	const users = req.params.users;
	let results;

	try {
		const cacheResults = await redisClient.get(users);

		if (cacheResults) {
			results = JSON.parse(cacheResults);
			res.status(200).send({
				fromCache: true,
				data: results,
			});
		} else {
			next();
		}
	} catch (error) {
		console.error(error);
		res.status(404);
	}
}
