const express = require("express");
const router = express.Router();
const csvController = require("../controllers/company");
const upload = require("../middlewares/upload");
import { auth } from '../middlewares/auth';

router.post("/" , csvController.createCompany);
router.get("/" , csvController.getCompany);

export default router;