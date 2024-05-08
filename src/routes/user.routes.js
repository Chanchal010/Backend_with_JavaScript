import { Router } from "express";
import {
    changeCurrentUserPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAvatar,
    updateCoverImage,
    updateUserDetails
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),

    registerUser
)

router.route("/login").post(loginUser)
// secured Routes
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post
    (verifyJwt, changeCurrentUserPassword)
router.route("/current-user").get(verifyJwt, getCurrentUser)
router.route("/update-account").patch(verifyJwt, updateUserDetails)

router.route("/avatar").patch(verifyJwt, upload.single("avatar"), updateAvatar)
router.route("/cover-image").patch(verifyJwt, upload.single("coverImage"), updateCoverImage)



export default router