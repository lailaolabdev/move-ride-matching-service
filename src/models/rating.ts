import mongoose, { Document, Schema } from "mongoose";

export interface IRating extends Document {
  driverId: string
  rating: number
}

const RatingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
}
);

export const ratingModel = mongoose.model<IRating>(
  "Rating",
  RatingSchema
);
