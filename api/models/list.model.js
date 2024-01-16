import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    parkingSpot: {
      type: Boolean,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;
