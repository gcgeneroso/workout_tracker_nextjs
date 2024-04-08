import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Workout, { Workouts } from "../../models/Workout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  workout: Workouts;
};

/* Allows you to view pet card info and delete pet card*/
const WorkoutPage = ({ workout }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const workoutID = router.query.id;

    try {
      await fetch(`/api/workouts/${workoutID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the workout.");
    }
  };

  return (
    <div key={workout._id}>
      <div className="card">
        <h5 className="workout-date">{`${workout.prettyWorkoutDate}`}</h5>
        <div className="main-content">
          <p className="workout-weight">Weight: {workout.weight}</p>

          <div className="btn-container">
            <Link href={`/${workout._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect();

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const workout = await Workout.findById(params.id).lean();

  if (!workout) {
    return {
      notFound: true,
    };
  }

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const serializedWorkout = JSON.parse(JSON.stringify(workout));
  const prettyWorkoutDate = new Date(serializedWorkout.workoutDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'})
  serializedWorkout['prettyWorkoutDate'] = prettyWorkoutDate

  return {
    props: {
      workout: serializedWorkout,
    },
  };
};

export default WorkoutPage;
