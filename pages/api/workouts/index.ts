import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Workout from "../../../models/Workout";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const workouts = await Workout.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: workouts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const workout = await Workout.create(
          req.body,
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: workout });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
