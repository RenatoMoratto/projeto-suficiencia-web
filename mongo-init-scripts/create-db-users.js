db = db.getSiblingDB("admin");

db.createUser({
	user: "read_only_user",
	pwd: "read_only_user_password",
	roles: [{ role: "read", db: "users_db" }],
});

db.createUser({
	user: "read_write_user",
	pwd: "read_write_user_password",
	roles: [{ role: "readWrite", db: "users_db" }],
});
