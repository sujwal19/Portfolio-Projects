import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: String,
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
