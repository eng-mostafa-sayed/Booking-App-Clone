import express from "express";

const router = express.Router();
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  checkAuthentication,
  checkUser,
  checkAdmin,
} from "../controllers/User.controller.js";
import { verifyUser, verifyAdmin } from "../helper/verify.token.helper.js";

// router.get("/checkauthentication", verifyToken, checkAuthentication);
// router.get("/checkuser/:id", verifyUser, checkUser);
// router.get("/checkadmin", verifyAdmin, checkAdmin);

//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GETALL
router.get("/", verifyAdmin, getAllUsers);
export default router;
