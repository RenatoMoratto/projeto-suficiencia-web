const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, NODE_DOCKER_PORT, JWT_SECRET, REDIS_HOST, REDIS_PORT } =
	process.env;

export const db_connection_string = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
export const port = NODE_DOCKER_PORT;
export const jwt_secret = JWT_SECRET;
export const redis_connection_string = `redis://${REDIS_HOST}:${REDIS_PORT}`;
