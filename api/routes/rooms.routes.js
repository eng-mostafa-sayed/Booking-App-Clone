import express from "express";
const router = express.Router();
import {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
} from "../controllers/room.controller.js";
import { verifyAdmin } from "../helper/verify.token.helper.js";

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET
router.get("/:id", getRoom);
//GETALL
router.get("/", getAllRooms);
export default router;
