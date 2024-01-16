import Listing from "../models/list.model.js";

export const createListing = async (req, res) => {
  console.log(req.body);
  try {
    const result = await Listing.create(req.body);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
