// routes/Patients.routes.js
import { Router } from "express";
import { registerUser } from "../controllers/patients.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

export default router;


// http://localhost:3000/api/v1/patients/register