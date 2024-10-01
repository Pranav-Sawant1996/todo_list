import React from "react";
import styles from "../../../style/addTask.module.css";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../../context/authContext";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { fetchTask } from "../../apiCalls/apiCall";

export default function TaskForm({ handleCloseAddTask, task, action }) {
  const { userDetails, todo, setTodo } = useAuth();
  // console.log("task", task);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.task_description || "",
      priority: task?.priority || "",
      date: task?.task_date
        ? moment(task.task_date, "ddd, DD MMM YYYY HH:mm:ss [GMT]").format(
            "YYYY-MM-DD"
          )
        : "",
      vital: task?.vital == 1 ? true : false,
      status: task?.status ? task?.status : "",
    },
  });
  const submit = async (data) => {
    if (action == "addTask") {
      const payload = {
        title: data.title,
        task_decription: data.description,
        priority: data.priority,
        vital: data.vital ? true : false,
        task_date: data.date,
        status: "1", //not started - 1, in progress - 2, completed - 3
        user_id: userDetails.id,
      };
      // console.log("first", payload);
      fetch("/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            console.log("task added successful!");
            fetchTask(userDetails, todo, setTodo);
            handleCloseAddTask();
          } else {
            console.log("failed!");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else if (action == "editTask") {
      const payload = {
        title: data.title,
        task_decription: data.description,
        priority: data.priority,
        vital: data.vital ? true : false,
        task_date: data.date,
        status: data.status, //not started - 1, in progress - 2, completed - 3
        user_id: userDetails.id,
        id: task.id,
      };
      // console.log("eeeee", data);
      fetch("/update-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            console.log("task edited successful!");
            fetchTask(userDetails, todo, setTodo);
            handleCloseAddTask();
          } else {
            console.log("failed!");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // const priorityOptions = ['Extreme', 'Moderate', 'Low'];
  return (
    <form className={styles.formSection} onSubmit={handleSubmit(submit)}>
      <div className={styles.inputGroup}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        {/* <input type="text" id="title" className={styles.input} /> */}
        <Controller
          control={control}
          name="title"
          rules={{
            required: { value: true, message: "This is required" },
          }}
          render={({ field: { onChange, value } }) => (
            <input
              onChange={onChange}
              value={value}
              type="text"
              id="title"
              className={styles.input}
            />
          )}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>
      <div className={styles.inputGroup}>
        <Controller
          control={control}
          name="date"
          rules={{
            required: { value: true, message: "This is required" },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <label htmlFor="date" className={styles.label}>
                Date
              </label>
              <div className={styles.dateInputWrapper}>
                <input
                  // placeholder="Enter Firstname"
                  onChange={onChange}
                  value={value}
                  type="date"
                  id="date"
                  className={styles.input}
                />
              </div>
            </>
          )}
        />
      </div>

      {action == "editTask" && (
        <div className={styles.inputGroup}>
          <Controller
            control={control}
            name="status"
            //   rules={{ required: "" }}
            render={({ field: { onChange, value } }) => (
              <FormControl sx={{}} size="small">
                <InputLabel id="demo-select-small-label">Status</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={value}
                  label="Status"
                  onChange={onChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Not Started</MenuItem>
                  <MenuItem value={2}>In Progress</MenuItem>
                  <MenuItem value={3}>Completed</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.status && <p className="error">{errors.status.message}</p>}
        </div>
      )}

      <fieldset className={styles.priorityFieldset}>
        <legend className={styles.label}>Priority</legend>
        <div className={styles.priorityOptions}>
          <Controller
            control={control}
            name="priority"
            rules={{
              required: { value: true, message: "This is required" },
            }}
            render={({ field: { onChange, value } }) => (
              <div className={styles.priorityOption}>
                <input
                  // placeholder="Enter Firstname"
                  onChange={onChange}
                  value="1"
                  checked={value === "1"}
                  type="radio"
                  id="priority"
                  className={styles.priorityInput}
                />
                <label className={styles.priorityLabel}>Extreme</label>
              </div>
            )}
          />
          <Controller
            control={control}
            name="priority"
            rules={{
              required: { value: true, message: "This is required" },
            }}
            render={({ field: { onChange, value } }) => (
              <div className={styles.priorityOption}>
                <input
                  // placeholder="Enter Firstname"
                  onChange={onChange}
                  value="2"
                  checked={value === "2"}
                  type="radio"
                  id="priority"
                  className={styles.priorityInput}
                />
                <label className={styles.priorityLabel}>Moderate</label>
              </div>
            )}
          />
          <Controller
            control={control}
            name="priority"
            rules={{
              required: { value: true, message: "This is required" },
            }}
            render={({ field: { onChange, value } }) => (
              <div className={styles.priorityOption}>
                <input
                  // placeholder="Enter Firstname"
                  onChange={onChange}
                  value="3"
                  checked={value === "3"}
                  type="radio"
                  id="priority"
                  className={styles.priorityInput}
                />
                <label className={styles.priorityLabel}>Low</label>
              </div>
            )}
          />
          {errors.priority && (
            <p className="error">{errors.priority.message}</p>
          )}
          <Controller
            control={control}
            name="vital"
            // rules={{
            //     required: { value: true, message: "This is required" },
            // }}
            render={({ field: { onChange, value } }) => (
              <div className={styles.priorityOption}>
                <input
                  // placeholder="Enter Firstname"
                  onChange={onChange}
                  value={value}
                  type="checkbox"
                  checked={value === true}
                  id="vital"
                  className={styles.priorityInput}
                />
                <label className={styles.priorityLabel}>
                  Mark as vital task
                </label>
              </div>
            )}
          />
        </div>
      </fieldset>
      <section className={styles.taskDescription}>
        <Controller
          control={control}
          name="description"
          // rules={{
          //     required: { value: true, message: "This is required" },
          // }}
          render={({ field: { onChange, value } }) => (
            <>
              <label htmlFor="description" className={styles.label}>
                Task Description
              </label>
              <textarea
                id="description"
                className={styles.descriptionInput}
                placeholder="Start writing here....."
                value={value}
                onChange={onChange}
              ></textarea>
            </>
          )}
        />
      </section>
      <button type="submit" className={styles.submitButton}>
        Done
      </button>
    </form>
  );
}
