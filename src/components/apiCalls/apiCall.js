
export const fetchTask = (userDetails, todo, setTodo) => {
  // console.log("user",userDetails)
  fetch("/get-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails.id),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        setTodo(result.tasks);
        console.log("get task successful!", result);
      } else {
        console.log("get task failed!");
      }
    })
    .catch((error) => console.error("Error:", error));
};
export const deleteTask = (userDetails) => {
  // console.log("user",userDetails)
  fetch("/delete-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: userDetails.id }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        // setTodo(result.tasks);
        console.log("get task successful!", result);
      } else {
        console.log("get task failed!");
      }
    })
    .catch((error) => console.error("Error:", error));
};
