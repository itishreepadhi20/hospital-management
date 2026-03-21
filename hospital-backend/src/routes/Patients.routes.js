// routes/Patients.routes.js
import { Router } from "express";
import { 
    changeCurrentPassword,
    getCurrentPatient, 
    getPatientProfile,
    loginPatient,
    logoutPatient,
    refreshAccessToken,
    registerPatient,
    updateAccountDetails,
    updatePatientAvatar,
    updatePatientCoverImage 
      } 
  from "../controllers/patients.controllers.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

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
router.route("/login").post(loginPatient)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(verifyJWT, logoutPatient)
router.route("/current").get(verifyJWT, getCurrentPatient)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updatePatientAvatar
)
router.route("/cover-image").patch(
    verifyJWT,
    upload.single("coverImage"),
    updatePatientCoverImage
)
router.route("/profile/:patientId").get(verifyJWT, getPatientProfile)

export default router;


// http://localhost:3000/api/v1/patients/register