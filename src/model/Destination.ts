import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    currencyCode: {
      type: String,
      required: true,
    },
    costTier: {
      type: String,
      required: true,
      enum: ["Budget", "Mid-Range", "Upper-Mid", "Premium"],
    },
    roundTripFlightCostUSD: {
      type: Number,
      required: true,
    },
    hotelCostPerNightUSD: {
      type: Number,
      required: true,
    },
    foodCostPerPersonPerDayUSD: {
      type: Number,
      required: true,
    },
    localTransportCostPerPersonPerDayUSD: {
      type: Number,
      required: true,
    },
    activitiesCostPerPersonPerDayUSD: {
      type: Number,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.models.Destination || mongoose.model("Destination", destinationSchema);

export default Destination;