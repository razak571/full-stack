import { useEffect, useRef, useState } from "react";

function ComponentA() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      todo: "react",
      done: false,
      edit: false,
    },
    {
      id: 2,
      todo: "node",
      done: false,
      edit: false,
    },
  ]);

  const createTask = () => {
    console.log("cal", inputRef.current.value);

    if (inputRef.current.value) {
      const newTask = {
        id: Date.now(),
        todo: inputRef.current.value,
        done: false,
        edit: false,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      inputRef.current.value = "";
    } else {
      alert("task empty");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks);
    }
  }, []);

  const inputRef = useRef();

  const doneTask = (id) => {
    console.log(id);
    const filtetredTask = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    setTasks(filtetredTask);
    localStorage.setItem("tasks", JSON.stringify(filtetredTask));
  };

  const editTask = (id, todo) => {
    console.log(id);
    const filteredTask = tasks.map((task) =>
      task.id === id ? { ...task, edit: true } : task
    );

    console.log(filteredTask);
    setTasks(filteredTask);
    localStorage.setItem("tasks", JSON.stringify(filteredTask));
    setEdit(todo);
  };

  const handleUpdate = (id) => {
    console.log(id);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, edit: false, todo: edit } : task
    );
    console.log(updatedTasks);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const [edit, setEdit] = useState();

  console.log(edit);

  const deleteTask = (id) => {
    console.log(id);
    const filteredTask = tasks.filter((task) => task.id !== id);
    console.log(filteredTask);
    setTasks(filteredTask);
    localStorage.setItem("tasks", JSON.stringify(filteredTask));
  };
  return (
    <>
      <input type="text" placeholder="add task" ref={inputRef} />
      <button onClick={() => createTask()}>add task</button>
      {tasks?.map((task) => (
        <h1 key={task.id}>
          {"  "}
          {task.done ? (
            <span style={{ opacity: "50%", textDecoration: "line-through" }}>
              {task.edit ? (
                <>
                  <input
                    value={edit}
                    onChange={(event) => {
                      setEdit(event.target.value);
                    }}
                  />
                  <button onClick={() => handleUpdate(task.id)}>Update</button>
                </>
              ) : (
                task.todo
              )}
            </span>
          ) : (
            <span>
              {task.edit ? (
                <>
                  <input
                    value={edit}
                    onChange={(event) => setEdit(event.target.value)}
                  />{" "}
                  <button onClick={() => handleUpdate(task.id)}>Upadte</button>
                </>
              ) : (
                task.todo
              )}
            </span>
          )}{" "}
          {!task.edit && (
            <>
              <button onClick={() => doneTask(task.id)}>done</button>{" "}
              <button onClick={() => editTask(task.id, task.todo)}>edit</button>{" "}
              <button onClick={() => deleteTask(task.id, task.todo)}>
                delete
              </button>
            </>
          )}
        </h1>
      ))}
    </>
  );
}

export default ComponentA;
