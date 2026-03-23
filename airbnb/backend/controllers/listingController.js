import Listing from "../models/Listing.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE
export const createListing = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;

  let image = null;
  let imagePublicId = null;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    image = result;
  }

  const listing = await Listing.create({
    title,
    description,
    price,
    host: req.user,
    image,
    imagePublicId,
  });

  res.status(201).json({
    success: true,
    message: "Listing created",
    data: listing,
  });
});

// GET ALL
export const getListings = asyncHandler(async (req, res) => {
  const search = req.query.q;

  const filter = search ? { title: { $regex: search, $options: "i" } } : {};

  const listings = await Listing.find(filter).populate("host", "name email");

  res.json({
    success: true,
    data: listings,
  });
});

// GET ONE
export const getListing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  const listing = await Listing.findById(id).populate("host", "name email");

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  res.json({
    success: true,
    data: listing,
  });
});

// DELETE
export const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (req.user !== listing.host.toString()) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  await listing.deleteOne();

  res.json({
    success: true,
    message: "Listing deleted",
  });
});

// UPDATE
export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (req.user !== listing.host.toString()) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  const { title, description, price, removeImage } = req.body;

  listing.title = title || listing.title;
  listing.description = description || listing.description;
  listing.price = price || listing.price;

  if (removeImage === "true") {
    listing.image = null;
  }

  if (req.file) {
    const image = await uploadToCloudinary(req.file.buffer);
    listing.image = image;
  }

  await listing.save();

  res.json({
    success: true,
    message: "Listing updated",
    data: listing,
  });
});
