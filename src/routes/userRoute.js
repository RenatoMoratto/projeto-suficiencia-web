import express from "express";
import { authenticate, create, findAll } from "../controllers/user.js";
import { verifyToken } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/new", create);
router.post("/oauth", authenticate);
router.get("/all", verifyToken, findAll);

export { router as userRouter };
