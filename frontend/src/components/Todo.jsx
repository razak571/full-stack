import { useEffect, useRef, useState } from "react";

const Todo = () => {
  const inputRef = useRef();

  //   const [test, setTest] = useState("testig");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "task 1",
      done: true,
    },
    {
      id: 2,
      name: "task 2",
      done: false,
    },
  ]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      name: inputRef.current.value,
      done: false,
    };

    if (inputRef.current.value.trim() !== "") {
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    }
    inputRef.current.value = "";
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markeDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <>
      <input type="input" placeholder="add task" ref={inputRef} />
      <button onClick={addTask}>add task</button>
      <div>
        {tasks?.map((task) => (
          <>
            <li key={task.id} style={{ listStyle: "none" }}>
              {!task.done ? (
                <span style={{ textDecoration: "none" }}>{task.name}</span>
              ) : (
                <span
                  style={{ textDecoration: "line-through", opacity: "0.5" }}
                >
                  {task.name}
                </span>
              )}
              <button
                style={{
                  margin: "5px",
                  border: "1px solid",
                  borderRadius: "5px",
                  padding: "2px",
                  //   textDecoration: "line-through",
                  //   font
                }}
                onClick={() => deleteTask(task.id)}
              >
                delete task
              </button>
              <button onClick={() => markeDone(task.id)}>
                {!task.done ? "done" : "un-done"}
              </button>
            </li>
          </>
        ))}
      </div>
    </>
  );
};

export default Todo;
