import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    description: { type: String, required: true },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);
roomSchema.methods.toJSON = function () {
  const deleted = ["password", "__v"];
  const data = this.toObject();
  deleted.forEach((d) => delete data[d]);
  return data;
};
export default mongoose.model("Room", roomSchema);
