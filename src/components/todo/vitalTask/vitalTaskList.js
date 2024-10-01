import React from "react";
import styles from "../../../style/myTask.module.css";
import defaultImage from "../../../images/defaultTask.png";
import moment from "moment";

export default function VitalTaskList({ tasks, setSelectedTask }) {
  return (
    <section className={styles.taskList}>
      <div className={styles.taskListContent}>
        <h2 className={styles.taskListTitle}>Vital Tasks</h2>
        <div className={styles.taskListDivider}></div>
        {tasks.map((task, index) => (
          <div
            key={index}
            className={styles.taskItem}
            onClick={() => setSelectedTask(task)}
          >
            <div className={styles.taskInfo}>
              <div className={styles.task}>
                <div className={styles.short_task}>
                  <div className={styles.taskTitle}>
                    {/* <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ac1ae0d5bd96ef488de0cbdf7b5485cc08153dcdcb28f7a69818e3968d25222?placeholderIfAbsent=true&apiKey=3e9ce65a9ab94df0a79d76628e51f49a" alt="" className={styles.menuIcon} /> */}
                    <h3>{task.title}</h3>
                  </div>
                  <p className={styles.taskDescription}>
                    {task.task_description}
                  </p>
                </div>
                <div>
                  <img
                    src={
                      task.image == undefined || task.image == null
                        ? defaultImage
                        : task.image
                    }
                    alt=""
                    className={styles.taskImage}
                  />
                </div>
              </div>
              <div className={styles.taskMeta}>
                <div className={styles.taskMeta}>
                  <span className={styles.taskPriority}>
                    Priority:{" "}
                    <span
                      style={{
                        color:
                          task.priority === "Extreme" ? "#f21e1e" : "#42ade2",
                      }}
                    >
                      {task.priority == "1"
                        ? "Extreme"
                        : task.priority == "2"
                        ? "Moderate"
                        : "Low"}
                    </span>
                  </span>
                  <span className={styles.taskStatus}>
                    Status:{" "}
                    <span
                      style={{
                        color:
                          task.status === "Not Started" ? "#f21e1e" : "#0225ff",
                      }}
                    >
                      {task.status == "1"
                        ? "Not Started"
                        : task.status == "2"
                        ? "In Progress"
                        : "Completed"}
                    </span>
                  </span>
                  <span className={styles.taskCreationDate}>
                    Created on:{" "}
                    {moment(
                      task.created_at,
                      "ddd, DD MMM YYYY HH:mm:ss [GMT]"
                    ).format("DD/MM/YYYY")}
                  </span>
                  {/* <p className={styles.taskCreationDate}>Created on: {task.creationDate}</p> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
