import { useState } from "react";

const TodoTest = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "react",
      done: true,
    },
    {
      id: 2,
      name: "node",
      done: true,
    },
    {
      id: 3,
      name: "express",
      done: false,
    },
    {
      id: 4,
      name: "nextjs",
      done: false,
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  console.log(filteredTasks);
  console.log(filter);

  return (
    <>
      <button
        style={{ border: "1px solid", margin: "2px", padding: "2px" }}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        style={{ border: "1px solid", margin: "2px", padding: "2px" }}
        onClick={() => setFilter("done")}
      >
        Done
      </button>
      <button
        style={{ border: "1px solid", margin: "2px", padding: "2px" }}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
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
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoTest;
