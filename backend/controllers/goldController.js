import GoldPurchase from "../models/GoldPurchase.js";

// Buy Gold Controller
export const buyGold = async (req, res) => {
  try {
    const { quantity } = req.body; // frontend sends quantity

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid gold quantity" });
    }

    // Current date and time
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const time = now.toTimeString().split(" ")[0]; // "HH:mm:ss"

    const newPurchase = new GoldPurchase({
      quantity,
      date,
      time,
      modeOfPayment: "Digital",
    });

    await newPurchase.save();

    res.status(201).json({
      message: "Gold purchase successful",
      purchase: newPurchase,
    });
  } catch (error) {
    console.error("Gold Purchase Error:", error);
    res.status(500).json({ message: "Error buying gold", error: error.message });
  }
};
