import mongoose from "mongoose";

const goldPurchaseSchema = new mongoose.Schema({
  quantity: { type: Number, required: true }, // quantity of gold
  date: { type: String, required: true },     // e.g. "2025-08-26"
  time: { type: String, required: true },     // e.g. "10:45:30"
  modeOfPayment: { type: String, default: "Digital" } // always Digital
}, { timestamps: true }); // adds createdAt, updatedAt automatically

export default mongoose.model("GoldPurchase", goldPurchaseSchema);
