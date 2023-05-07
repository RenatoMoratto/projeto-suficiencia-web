const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, RABBIT_HOST, RABBIT_PORT, DEFAULT_USER, PORT } = process.env;

export const db_connection_string = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
export const rabbit_host = RABBIT_HOST;
export const rabbit_port = RABBIT_PORT;
export const port = PORT;
export const default_user = JSON.parse(DEFAULT_USER);
