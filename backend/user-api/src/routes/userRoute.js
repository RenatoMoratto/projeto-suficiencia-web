import express from "express";
import { authenticate, create, findAll } from "../controllers/user.js";
import { verifyToken } from "../middlewares/authenticate.js";
import { cacheUsersData } from "../middlewares/cache.js";

const router = express.Router();

router.post("/oauth", authenticate);
router.post("/new", verifyToken, create);
router.get("/all", verifyToken, cacheUsersData, findAll);

export { router as userRouter };
