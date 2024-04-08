import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Workout from "../../../models/Workout";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const workout = await Workout.findById(id);
        if (!workout) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: workout });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const workout = await Workout.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!workout) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: workout });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedWorkout = await Workout.deleteOne({ _id: id });
        if (!deletedWorkout) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
