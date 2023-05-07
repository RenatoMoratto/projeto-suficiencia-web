const {
	DB_WRITE_USER,
	DB_WRITE_PASS,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	MQ_HOST,
	MQ_PORT,
	MQ_USER,
	MQ_PASS,
	DEFAULT_USER,
	QUEUE_DOCKER_PORT,
} = process.env;

export const db_connection_string = `mongodb://${DB_WRITE_USER}:${DB_WRITE_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
export const rabbit_host = MQ_HOST;
export const rabbit_port = MQ_PORT;
export const rabbit_user = MQ_USER;
export const rabbit_password = MQ_PASS;
export const port = QUEUE_DOCKER_PORT;
export const default_user = JSON.parse(DEFAULT_USER);
