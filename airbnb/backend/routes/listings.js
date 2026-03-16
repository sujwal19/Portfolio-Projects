import express from "express";
const router = express.Router();
import Listing from "../models/Listing.js";

router.post("/", async (req, res) => {
  const listing = new Listing(req.body);
  await listing.save();

  res.status(201).json({
    success: true,
    message: "Listing Added",
    data: listing,
  });
});

router.get("/", async (req, res) => {
  const listing = await Listing.find();
  res.status(200).json({
    success: true,
    message: "Listing Added",
    data: listing,
  });
});

export default router;
