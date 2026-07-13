import { Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number, default: 0 },
    caloriesBurned: { type: Number, required: true },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = models.Activity || model('Activity', activitySchema);
