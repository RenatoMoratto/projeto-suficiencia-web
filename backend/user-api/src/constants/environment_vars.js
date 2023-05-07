const {
	DB_READ_USER,
	DB_READ_PASS,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	MQ_HOST,
	MQ_PORT,
	MQ_USER,
	MQ_PASS,
	API_DOCKER_PORT,
	JWT_SECRET,
	REDIS_HOST,
	REDIS_PORT,
} = process.env;

export const db_connection_string = `mongodb://${DB_READ_USER}:${DB_READ_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
export const port = API_DOCKER_PORT;
export const jwt_secret = JWT_SECRET;
export const redis_connection_string = `redis://${REDIS_HOST}:${REDIS_PORT}`;
export const rabbit_host = MQ_HOST;
export const rabbit_port = MQ_PORT;
export const rabbit_user = MQ_USER;
export const rabbit_password = MQ_PASS;
