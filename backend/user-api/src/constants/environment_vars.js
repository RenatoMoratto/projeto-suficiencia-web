const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	RABBIT_HOST,
	RABBIT_PORT,
	RABBIT_USER,
	RABBIT_PASSWORD,
	NODE_DOCKER_PORT,
	JWT_SECRET,
	REDIS_HOST,
	REDIS_PORT,
} = process.env;

export const db_connection_string = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
export const port = NODE_DOCKER_PORT;
export const jwt_secret = JWT_SECRET;
export const redis_connection_string = `redis://${REDIS_HOST}:${REDIS_PORT}`;
export const rabbit_host = RABBIT_HOST;
export const rabbit_port = RABBIT_PORT;
export const rabbit_user = RABBIT_USER;
export const rabbit_password = RABBIT_PASSWORD;
