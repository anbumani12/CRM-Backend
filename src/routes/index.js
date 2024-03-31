import express from "express";
import IndexController from "../controllers/index.js";
import UserRoutes from "./user.js";
import SRRoutes from "./servicerequest.js";
import AdminRoutes from "./admin.js";
const router = express.Router();

router.get("/", IndexController.home);

router.use("/users", UserRoutes);
router.use("/sr", SRRoutes);
router.use("/admin", AdminRoutes);

export default router;
