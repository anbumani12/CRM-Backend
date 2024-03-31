import express from "express";
import validate from "../middleware/Validate.js";
import SRController from "../controllers/servicerequest.js";

import AdminController from "../controllers/admin.js";

const router = express.Router();

router.get("/dashboard-count", validate, AdminController.dashboardCount);
router.get("/list/:status", validate, AdminController.list);
router.get("/service/:srno", validate, SRController.getBySrNo);
router.put("/change-status/:id", validate, AdminController.changeStatus);

export default router;
