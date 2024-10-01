import React, { useState } from "react";
import styles from "../../../style/myTask.module.css";
import defaultImage from "../../../images/defaultTask.png";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTask from "../addTask/addTask";
import { deleteTask, fetchTask } from "../../apiCalls/apiCall";
import { useAuth } from "../../../context/authContext";

export default function TaskDetails({ selectedTask }) {
  // console.log("selectedTask",selectedTask)
  const { userDetails, todo, setTodo } = useAuth();

  const [openAddTask, setOpenAddTask] = useState(false);
  const handleOpenAddTask = () => setOpenAddTask(true);
  const handleCloseAddTask = () => setOpenAddTask(false);
  const deleteSelectedTask = ()=>{
     deleteTask(userDetails)
    //  fetchTask(userDetails, todo, setTodo)
  }
  return (
    <section className={styles.taskDetails}>
      <div className={styles.taskDetailsContent}>
        <div className={styles.taskDetailHeader}>
          <img
            src={
              selectedTask.image == undefined || selectedTask.image == null
                ? defaultImage
                : selectedTask.image
            }
            alt="Task illustration"
            className={styles.taskDetailImage}
          />
          <div className={styles.taskDetailInfo}>
            <h2 className={styles.taskDetailTitle}>{selectedTask.title}</h2>
            <p className={styles.taskDetailPriority}>
              Priority:{" "}
              <span style={{ color: "#f21e1e" }}>
                {selectedTask.priority == "1"
                  ? "Extreme"
                  : selectedTask.priority == "2"
                  ? "Moderate"
                  : "Low"}
              </span>
            </p>
            <p className={styles.taskDetailStatus}>
              Status:{" "}
              <span style={{ color: "#f21e1e" }}>
                {selectedTask.status == "1"
                  ? "Not Started"
                  : selectedTask.status == "2"
                  ? "In Progress"
                  : "Completed"}
              </span>
            </p>
            <p className={styles.taskDetailCreationDate}>
              Created on:{" "}
              {moment(
                selectedTask.created_at,
                "ddd, DD MMM YYYY HH:mm:ss [GMT]"
              ).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
        <div className={styles.taskDetailDescription}>
          <h3>Task Title: {selectedTask.title}</h3>
          {/* <p><strong>Objective:</strong> To submit required documents for something important</p> */}
          <p>
            <strong>Task Description:</strong> {selectedTask.task_description}
          </p>
          {/* <h4>Additional Notes:</h4>
                    <ul>
                        <li>Ensure that the documents are authentic and up-to-date.</li>
                        <li>Maintain confidentiality and security of sensitive information during the submission process.</li>
                        <li>If there are specific guidelines or deadlines for submission, adhere to them diligently.</li>
                    </ul> */}
          <p>
            <strong>Deadline :</strong>{" "}
            {moment(
              selectedTask.task_date,
              "ddd, DD MMM YYYY HH:mm:ss [GMT]"
            ).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className={styles.taskIcons}>
          <EditIcon onClick={handleOpenAddTask} />
          <DeleteIcon onClick={deleteSelectedTask} />
        </div>
      </div>
      <AddTask
        openAddTask={openAddTask}
        setOpenAddTask={setOpenAddTask}
        handleOpenAddTask={handleOpenAddTask}
        handleCloseAddTask={handleCloseAddTask}
        headerTitle="Edit Task"
        task={selectedTask}
        action='editTask'
      />
    </section>
  );
}
