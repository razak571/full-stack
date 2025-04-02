import { useEffect, useRef, useState } from "react";

const TodoTest = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "React",
      state: true,
    },
    {
      id: 2,
      name: "Node",
      state: false,
    },
  ]);
  const taskRef = useRef();

  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      name: taskRef.current.value,
      state: false,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    taskRef.current.value = "";
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks")).length !== 0) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    } else {
      setTasks(tasks);
    }
  }, []);

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, state: !task.state } : task
      )
    );

    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task) =>
          task.id === id ? { ...task, state: !task.state } : task
        )
      )
    );
  };

  const deletTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  return (
    <>
      <input placeholder="add new task" type="text" ref={taskRef} />
      <button onClick={() => addNewTask()}>add task</button>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            {" "}
            {task.state === false ? (
              <span>{task.name}</span>
            ) : (
              <span
                style={{
                  color: "red",
                  textDecoration: "line-through",
                  opacity: "50%",
                }}
              >
                {task.name}
              </span>
            )}
            <button
              onClick={() => completeTask(task.id)}
              style={{ margin: "2px", border: "1px solid", padding: "2px" }}
            >
              complete
            </button>
            <button
              onClick={() => deletTask(task.id)}
              style={{ margin: "2px", border: "1px solid", padding: "2px" }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default TodoTest;
