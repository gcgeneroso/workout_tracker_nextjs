import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Workout, { Workouts } from "../models/Workout";
import { GetServerSideProps } from "next";

type Props = {
  workouts: Workouts[];
};

const Index = ({ workouts }: Props) => {
  return (
    <>
      {workouts.map((workout) => (
        <div key={workout._id}>
          <div className="card">
            <h5 className="workout-date">{`${workout.prettyWorkoutDate}`}</h5>
            <div className="main-content">
              <p className="workout-weight">{workout.weight}</p>

              <div className="btn-container">
                <Link href={{ pathname: "/[id]/edit", query: { id: workout._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: "/[id]", query: { id: workout._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Workout.find({}).sort({'workoutDate': -1});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const workouts = result.map((doc) => {
    const workout = JSON.parse(JSON.stringify(doc));
    const prettyWorkoutDate = new Date(workout.workoutDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'})
    workout['prettyWorkoutDate'] = prettyWorkoutDate
    return workout;
  });

  return { props: { workouts: workouts } };
};

export default Index;
