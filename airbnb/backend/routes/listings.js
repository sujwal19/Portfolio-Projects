import express from "express";
const router = express.Router();
import Listing from "../models/Listing.js";
import { protect } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";
import upload from "../middleware/upload.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req.body;

    let imageURL = "";

    if (req.file) {
      imageURL = await uploadToCloudinary(req.file.buffer, "airbnb-images");
    }

    const listing = new Listing({
      title,
      description,
      price,
      host: req.user,
      image: imageURL,
    });

    await listing.save();

    res.status(201).json({
      success: true,
      message: "Listings Added successfully",
      data: listing,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  const searchTerm = req.query.q;

  const filter = searchTerm
    ? { title: { $regex: searchTerm, $options: "i" } }
    : {};

  const listing = await Listing.find(filter).populate("host", "name email");
  res.status(200).json({
    success: true,
    message: "Listing Fetched",
    data: listing,
  });
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID",
      });
    }

    const singleListing = await Listing.findById(id).populate(
      "host",
      "name email",
    );

    if (!singleListing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single listing fetched",
      data: singleListing,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID",
      });
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing Not Found",
      });
    }

    if (req.user !== listing.host.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Listing.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID",
      });
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing Not Found",
      });
    }

    if (req.user !== listing.host.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { title, description, price } = req.body;

    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;

    if (req.file) {
      listing.image = await uploadToCloudinary(
        req.file.buffer,
        "airbnb-images",
      );
    }

    await listing.save();

    return res.status(200).json({
      success: true,
      message: "Listing Updated successfully",
      data: listing,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
