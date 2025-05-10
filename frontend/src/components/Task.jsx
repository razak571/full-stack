import { useEffect, useRef, useState } from "react";

const Task = () => {
  const [task, setTask] = useState([
    {
      id: 1,
      name: "react",
      edit: false,
      done: false,
    },
    {
      id: 2,
      name: "node",
      edit: false,
      done: false,
    },
  ]);

  const taskRef = useRef();

  const createTask = () => {
    if (taskRef.current.value.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: taskRef.current.value,
        edit: false,
        done: false,
      };
      console.log(newTask);
      setTask([...task, newTask]);
      localStorage.setItem("task", JSON.stringify([...task, newTask]));
      taskRef.current.value = "";
    } else {
      alert("empty task/spaces not allowed");
      taskRef.current.value = "";
    }
  };

  useEffect(() => {
    if (localStorage.getItem("task")) {
      setTask(JSON.parse(localStorage.getItem("task")));
    } else {
      setTask(task);
    }
  }, []);

  const deleteTask = (id) => {
    const filteredTask = task.filter((task) => task.id !== id);
    localStorage.setItem("task", JSON.stringify(filteredTask));
    setTask(filteredTask);
  };

  const [edit, setEdit] = useState();
  const editTask = (id, name) => {
    const filterEdit = task.map((task) =>
      task.id === id ? { ...task, edit: !task.edit } : task
    );
    setTask(filterEdit);
    localStorage.setItem("task", JSON.stringify(filterEdit));
    setEdit(name);
  };

  const editRef = useRef();

  const saveTask = (id) => {
    const editTasks = task.map((task) =>
      task.id === id
        ? { ...task, edit: task.edit === false, name: editRef.current.value }
        : task
    );
    setTask(editTasks);
    localStorage.setItem("task", JSON.stringify(editTasks));
  };

  const doneTask = (id) => {
    const filteredTask = task.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    setTask(filteredTask);
    localStorage.setItem("task", JSON.stringify(filteredTask));
  };

  return (
    <>
      <div>
        <input placeholder="add new task" ref={taskRef} />
        <button onClick={() => createTask()}>add task</button>
        <ul>
          {task.map((task) => (
            <li key={task.id}>
              {task.edit === true ? (
                <input
                  type="text"
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                  ref={editRef}
                />
              ) : task.done === true ? (
                <span
                  style={{
                    opacity: "50%",
                    textDecoration: "line-through",
                    color: "green",
                  }}
                >
                  {task.name}
                </span>
              ) : (
                <span style={{ color: "blue" }}>{task.name}</span>
              )}
              <button
                style={{ marginLeft: "2px", border: "1px solid" }}
                onClick={() => deleteTask(task.id)}
              >
                delete
              </button>
              {task.edit ? (
                <button
                  style={{ marginLeft: "2px", border: "1px solid" }}
                  onClick={() => saveTask(task.id)}
                >
                  save
                </button>
              ) : (
                <button
                  style={{ marginLeft: "2px", border: "1px solid" }}
                  onClick={() => editTask(task.id, task.name)}
                >
                  edit
                </button>
              )}
              {/* <button
                style={{ marginLeft: "2px", border: "1px solid" }}
                onClick={() => doneTask(task.id)}
              >
                {task.done ? "un-done" : "done"}
              </button> */}
              <input
                type="checkbox"
                checked={task.done}
                onClick={() => doneTask(task.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Task;
