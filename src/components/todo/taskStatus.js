import React from "react";
import styles from "../../style/dashboard.module.css";
import DonutChart from "react-donut-chart";
import { Doughnut } from "react-chartjs-2";
// import { ArcElement } from "chart.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAuth } from "../../context/authContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskStatus() {
  const { todo } = useAuth();
//   console.log("todo0,", todo);
  const getPercentage = (p) => {
    let task = todo.filter((t, i) => {
      return t.status == p;
    });
    let percent=Math.round((task.length/todo.length)*100)
    // console.log("ppppp", percent);
    return percent
  };
//   getPercentage('1')
  const statuses = [
    { label: "Completed", color: "#00FF00", percentage: getPercentage('3') },
    { label: "In Progress", color: "#0000FF", percentage: getPercentage('2') },
    { label: "Not Started", color: "#FF0000", percentage: getPercentage('1') },
  ];
  //   const data={
  //     datasets:[{
  //         data:[3,7],
  //         backgroundColor:['red','blue']
  //     }]
  //   }
  const options = {};
  return (
    <section className={styles.taskStatusChart}>
      <h2 className={styles.taskStatusTitle}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8234f04af799fd33f37369b73e0dbe7c591da74cf0de21c1299cbf4cbd730407?placeholderIfAbsent=true&apiKey=3e9ce65a9ab94df0a79d76628e51f49a"
          alt=""
          className={styles.statusIcon}
        />
        Task Status
      </h2>
      <div className={styles.statusChart}>
        {statuses.map((status, index) => (
          <div key={index} className={styles.statusItem}>
            {/* <div
              className={styles.statusBar}
              style={{
                backgroundColor: status.color,
                width: `${status.percentage}%`,
              }}
            /> */}
            <Doughnut
              data={{
                datasets: [
                  {
                    data: [status.percentage, 100 - status.percentage],
                    backgroundColor: [status.color, "grey"],
                  },
                ],
              }}
              option={options}
            ></Doughnut>

            <p className={styles.statusLabel}>{status.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
