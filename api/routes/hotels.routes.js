import express from "express";
const router = express.Router();
import {
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  countByCity,
  countByType,
} from "../controllers/hotel.controller.js";
import { verifyAdmin } from "../helper/verify.token.helper.js";

//CREATE
router.post("/", verifyAdmin, createHotel);

//GETALL
router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET
router.get("/:id", getHotel);

export default router;
