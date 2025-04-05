import { useEffect, useRef, useState } from "react";

const TodoTest = () => {
  const taskRef = useRef();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "react",
      done: false,
    },
    {
      id: 2,
      name: "node",
      done: true,
    },
  ]);

  const addTask = () => {
    if (taskRef.current.value.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: taskRef.current.value,
        done: false,
      };

      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      taskRef.current.value = "";
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks"))) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  return (
    <>
      <input type="text" placeholder="add task" ref={taskRef} />
      <button onClick={() => addTask()}>add task</button>
      <div
        style={{
          backgroundColor: "violet",
          color: "blue",
          padding: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button style={{ margin: "5px" }} onClick={() => setFilter("all")}>
          All
        </button>
        <button style={{ margin: "5px" }} onClick={() => setFilter("done")}>
          Done
        </button>
        <button style={{ margin: "5px" }} onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>
      <div>
        {filteredTasks.map((task) => (
          <div key={task.id}>
            {task.done === true ? (
              <span
                style={{
                  color: "red",
                  opacity: "60%",
                  textDecoration: "line-through",
                }}
              >
                {task.name}
              </span>
            ) : (
              <span>{task.name}</span>
            )}{" "}
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => {
                const filteredTasks = tasks.map((t) =>
                  t.id === task.id ? { ...t, done: !t.done } : t
                );
                setTasks(filteredTasks);

                localStorage.setItem("tasks", JSON.stringify(filteredTasks));
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default TodoTest;
