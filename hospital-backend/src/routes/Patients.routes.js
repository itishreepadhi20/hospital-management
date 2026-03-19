// routes/Patients.routes.js
import { Router } from "express";
import { registerPatient } from "../controllers/patients.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Register patient
router.post(
    "/register",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerPatient
);

export default router;


// http://localhost:3000/api/v1/patients/register