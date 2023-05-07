import express from "express";
import { authenticate, create, findAll } from "../controllers/user.js";
import { verifyToken } from "../middlewares/authenticate.js";
// import { cacheUsersData } from "../middlewares/cache.js";

const router = express.Router();

router.post("/new", create);
router.post("/oauth", authenticate);
router.get("/all", verifyToken, findAll);
// router.get("/all", verifyToken, cacheUsersData, findAll);

export { router as userRouter };
