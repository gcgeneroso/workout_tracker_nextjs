import { useState } from "react";
import Form from "../components/Form";

const NewWorkout = () => {
  const todaysFullDate = new Date(Date.now())
  const todayMonth = String(todaysFullDate.getMonth() + 1).padStart(2, '0')
  const todayDate = String(todaysFullDate.getDate()).padStart(2, '0')
  let formatted_date = todaysFullDate.getFullYear() + '-' + todayMonth + '-' + todayDate
  const workoutForm = {
    workoutDate: formatted_date,
    weight: '130',
  };

  return <Form formId="add-workout-form" workoutForm={workoutForm} />;
};

export default NewWorkout;
