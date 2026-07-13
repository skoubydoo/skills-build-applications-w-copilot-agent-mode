import { Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusAreas: [{ type: String, required: true }],
    exercises: [{ type: String, required: true }],
    recommendedFor: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = models.Workout || model('Workout', workoutSchema);
