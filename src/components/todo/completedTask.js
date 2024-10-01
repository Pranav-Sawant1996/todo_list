import React from 'react'
import styles from "../../style/dashboard.module.css"
import { useAuth } from '../../context/authContext';
import defaultImage from '../../images/defaultTask.png'


export default function CompletedTask() {
  const { todo } = useAuth();
  const completedTasks = todo.filter((t,i)=>{return t.status=='3'})
    // const completedTasks = [
    //     {
    //       title: "Walk the dog",
    //       description: "Take the dog to the park and bring treats as well.",
    //       image: "https://cdn.builder.io/api/v1/image/assets/TEMP/356dc373cbb631d63a201d17cd74ef694967b42bbc415a09b51842defd225580?placeholderIfAbsent=true&apiKey=3e9ce65a9ab94df0a79d76628e51f49a",
    //       completedAgo: "2 days ago"
    //     },
    //     {
    //       title: "Conduct meeting",
    //       description: "Meet with the client and finalize requirements.",
    //       image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d841ae032930972480329c61024511a06f213a09ad72ff69784a05f9824f4f6f?placeholderIfAbsent=true&apiKey=3e9ce65a9ab94df0a79d76628e51f49a",
    //       completedAgo: "2 days ago"
    //     }
    //   ];
  return (
    <section className={styles.completedTasks}>
      <h2 className={styles.completedTasksTitle}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81063a004004879d9a4f0a9f7c51ea269252ace3fbb63858e9730049370b6bf?placeholderIfAbsent=true&apiKey=3e9ce65a9ab94df0a79d76628e51f49a" alt="" className={styles.completedIcon} />
        Completed Tasks
      </h2>
      {completedTasks.map((task, index) => (
        <article key={index} className={styles.completedTaskItem}>
          <div className={styles.taskContent}>
            <h3 className={styles.taskTitle}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d547e29301014cc1f851e5f4eab1410a00048b9729d6ff14c34e52c6c1adc18a?placeholderIfAbsent=true&apiKey=3e9ce65a9ab94df0a79d76628e51f49a" alt="" className={styles.checkIcon} />
              {task.title}
            </h3>
            <p className={styles.taskDescription}>{task.task_description}</p>
            <p className={styles.taskStatus}>
              Status: <span className={styles.statusCompleted}>Completed</span>
            </p>
            {/* <p className={styles.completedAgo}>Completed {task.completedAgo}.</p> */}
          </div>
          <div className={styles.taskMeta}>
            {/* <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f41643976c5700adc6f8f62a5cb49e93217163b2d20a3cb85b3977a2fb3621b2?placeholderIfAbsent=true&apiKey=3e9ce65a9ab94df0a79d76628e51f49a" alt="" className={styles.moreIcon} /> */}
            <img src={(task.image == undefined || task.image == null) ? defaultImage : task.image} alt="" className={styles.taskImage} />
          </div>
        </article>
      ))}
    </section>
  )
}
