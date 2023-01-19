import mongoose from "mongoose";
const { Schema } = mongoose;

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: { type: [String] },
  description: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  rooms: { type: [String] },
  cheapestPrice: { type: Number, required: true },
  featured: { type: Boolean, default: false },
});
hotelSchema.methods.toJSON = function () {
  const deleted = ["password", "__v"];
  const data = this.toObject();
  deleted.forEach((d) => delete data[d]);
  return data;
};

export default mongoose.model("Hotel", hotelSchema);
