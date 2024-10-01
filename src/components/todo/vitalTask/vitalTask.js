import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import VitalTaskList from "./vitalTaskList";
import VitalTaskDetails from "./vitalTaskDetails";

export default function VitalTask() {
  const { userDetails, todo, setTodo } = useAuth();
  const [selectedTask, setSelectedTask] = useState(
    todo.length > 0 ? todo[0] : []
  );
  const [tasks, setTasks] = useState(
    todo.filter((t, i) => {
      return t.vital == 1;
    })
  );
  useEffect(() => {
    let t = todo.filter((t, i) => {
      return t.vital == 1;
    });
    setTasks(t);
  }, [todo]);

  useEffect(() => {
    if (selectedTask.length == 0 && todo.length > 0) {
      setSelectedTask(todo[0]);
    }
  }, [todo]);
  return (
    <>
      <VitalTaskList tasks={tasks} setSelectedTask={setSelectedTask} />
      <VitalTaskDetails selectedTask={selectedTask} />
    </>
  );
}
