import express from "express";
import {
  createListing,
  getListings,
  getListing,
  deleteListing,
  updateListing,
} from "../controllers/listingController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router
  .route("/")
  .get(getListings)
  .post(protect, upload.single("image"), createListing);

router
  .route("/:id")
  .get(getListing)
  .put(protect, upload.single("image"), updateListing)
  .delete(protect, deleteListing);

export default router;
