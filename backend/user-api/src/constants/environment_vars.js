const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DEFAULT_USER, PORT, JWT_SECRET } = process.env;

export const db_connection_string = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
export const port = PORT;
export const jwt_secret = JWT_SECRET;
export const defaultUser = JSON.parse(DEFAULT_USER);
