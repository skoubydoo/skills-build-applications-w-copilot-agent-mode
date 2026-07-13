import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    role: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    weeklyTargetMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export const User = models.User || model('User', userSchema);
