import mongoose from "mongoose";

export interface Workouts extends mongoose.Document {
  workoutDate: Date;
  weight: number;
}

/* WorkoutSchema will correspond to a collection in your MongoDB database. */
const WorkoutSchema = new mongoose.Schema<Workouts>({
  workoutDate: {
    type: Date,
    required: [true, "Workout date"],
  },
  weight: {
    type: Number,
    required: [true, "Please provide a weight"],
    maxlength: [3, "Max weight 999 lbs"],
  },
});

export default mongoose.models.Workout || mongoose.model<Workouts>("Workout", WorkoutSchema);
