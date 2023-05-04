import express from "express";
import { authenticate, findAll, findUserById } from "../controllers/user.js";
import { verifyToken } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/all", verifyToken, findAll);
router.get("/:id", verifyToken, findUserById);
router.post("/oauth", authenticate);

export { router as userRouter };
