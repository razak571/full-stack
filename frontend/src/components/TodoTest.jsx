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
    const newTask = {
      id: Date.now(),
      name: taskRef.current.value,
      done: false,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    taskRef.current.value = "";
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks"))) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  return (
    <>
      <input type="text" placeholder="add task" ref={taskRef} />
      <button onClick={() => addTask()}>add task</button>
      <div>
        {tasks.map((task) => (
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
