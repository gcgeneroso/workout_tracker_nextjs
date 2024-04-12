import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditWorkout = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: workout,
    error,
    isLoading,
  } = useSWR(id ? `/api/workouts/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!workout) return null;

  
  const fullDate = new Date(workout.workoutDate)
  console.log(fullDate)
  const workoutMonth = String(fullDate.getMonth() + 1).padStart(2, '0')
  const workoutDate = String(fullDate.getUTCDate()).padStart(2, '0')
  let formatted_date = fullDate.getFullYear() + '-' + workoutMonth + '-' + workoutDate
  const workoutForm = {
    workoutDate: formatted_date,
    weight: workout.weight,
  };

  return <Form formId="edit-workout-form" workoutForm={workoutForm} forNewWorkout={false} />;
};

export default EditWorkout;
