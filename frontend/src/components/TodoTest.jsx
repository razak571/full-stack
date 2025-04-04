import { useEffect, useRef, useState } from "react";

const TodoTest = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "React",
      done: false,
      edit: false,
    },
    {
      id: 2,
      name: "Node",
      done: false,
      edit: false,
    },
  ]);

  const taskRef = useRef();

  const [edit, setEdit] = useState();

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.map((task) => {
    if (filter === "completed") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  console.log(filteredTasks);

  const createTask = () => {
    const newTask = {
      id: Date.now(),
      name: taskRef.current.value,
      done: false,
      edit: false,
    };
    setTasks([...tasks, newTask]);
    taskRef.current.value = "";
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks"))) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    } else {
      setTasks(tasks);
    }
  }, []);

  const doneTask = (id) => {
    // alert("he");
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task
        )
      )
    );
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const editTask = (id, name) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, edit: true } : task))
    );
    setEdit(name);
  };

  const saveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, edit: false, name: edit } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  //   const allTasks = () => {
  //     const allTasks = JSON.parse(localStorage.getItem("tasks"));
  //     setTasks(allTasks);
  //   };

  //   const doneTasks = () => {
  //     const allTasks = JSON.parse(localStorage.getItem("tasks"));
  //     const filteredDoneTasks = allTasks.filter((task) => task.done === true);
  //     console.log(filteredDoneTasks);
  //     if (filteredDoneTasks.length !== 0) {
  //       setTasks(filteredDoneTasks);
  //     } else {
  //       setTasks([]);
  //     }
  //   };

  //   const pendingTasks = () => {
  //     const allTasks = JSON.parse(localStorage.getItem("tasks"));
  //     const filteredpendingTasks = allTasks.filter((task) => task.done === false);
  //     setTasks(filteredpendingTasks);
  //   };
  return (
    <>
      <input placeholder="add task" type="text" ref={taskRef} />
      <button onClick={() => createTask()}>add task</button>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <button
          style={{ border: "1px solid", margin: "10px", padding: "2px" }}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          style={{ border: "1px solid", margin: "10px", padding: "2px" }}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          style={{ border: "1px solid", margin: "10px", padding: "2px" }}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.done === false ? (
              <span>
                {" "}
                {task.edit === true ? (
                  <input
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                  />
                ) : (
                  task.name
                )}{" "}
              </span>
            ) : (
              <span
                style={{
                  color: "red",
                  opacity: "50%",
                  textDecoration: "line-through",
                }}
              >
                {task.edit === true ? (
                  <input
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                  />
                ) : (
                  task.name
                )}
              </span>
            )}
            <button
              style={{ margin: "2px", padding: "2px", border: "1px solid" }}
              onClick={() => doneTask(task.id)}
            >
              {task.done === false ? "done" : "undone"}
            </button>
            <button
              style={{ margin: "2px", padding: "2px", border: "1px solid" }}
              onClick={() => deleteTask(task.id)}
            >
              delete
            </button>
            {task.edit === false ? (
              <button
                style={{ margin: "2px", padding: "2px", border: "1px solid" }}
                onClick={() => editTask(task.id, task.name)}
              >
                edit
              </button>
            ) : (
              <button
                style={{ margin: "2px", padding: "2px", border: "1px solid" }}
                onClick={() => saveTask(task.id)}
              >
                save
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
export default TodoTest;
