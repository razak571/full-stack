import { useEffect, useRef, useState } from "react";

const Task = () => {
  const [tasks, setTasks] = useState([
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

      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      taskRef.current.value = "";
    } else {
      taskRef.current.value = "";
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    } else {
      setTasks(tasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const [edit, setEdit] = useState();

  const [offEdit, setOffEdit] = useState(false);
  const editTask = (id, name) => {
    const filteredTasks = tasks.map((task) =>
      task.id === id ? { ...task, edit: (task.edit = true) } : task
    );
    setTasks(filteredTasks);
    setEdit(name);
    setOffEdit(true);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const saveTask = (id) => {
    const filteredEditTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, name: editRef.current.value, edit: (task.edit = false) }
        : task
    );
    setTasks(filteredEditTasks);
    setOffEdit(false);
    localStorage.setItem("tasks", JSON.stringify(filteredEditTasks));
  };

  const editRef = useRef();

  const doneTask = (id) => {
    const filteredTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };
  return (
    <>
      <div>
        <input placeholder="add new task" type="text" ref={taskRef} />
        <button onClick={() => createTask()}>add task</button>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.edit === true ? (
                <input
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                  ref={editRef}
                />
              ) : task.done === true ? (
                <span
                  style={{ opacity: "50%", textDecoration: "line-through" }}
                >
                  {" "}
                  {task.name}
                </span>
              ) : (
                <span>{task.name}</span>
              )}
              <button
                style={{ border: "1px solid", marginLeft: "2px" }}
                onClick={() => deleteTask(task.id)}
                disabled={offEdit}
              >
                delete
              </button>
              {task.edit === true ? (
                <button
                  style={{ border: "1px solid", marginLeft: "2px" }}
                  onClick={() => saveTask(task.id)}
                >
                  save
                </button>
              ) : (
                <button
                  style={{ border: "1px solid", marginLeft: "2px" }}
                  onClick={() => editTask(task.id, task.name)}
                  disabled={offEdit}
                >
                  edit
                </button>
              )}
              {/* {task.done === true ? (
                <button
                  style={{ border: "1px solid", marginLeft: "2px" }}
                  onClick={() => doneTask(task.id)}
                >
                  un-done
                </button>
              ) : (
                <button
                  style={{ border: "1px solid", marginLeft: "2px" }}
                  onClick={() => doneTask(task.id)}
                >
                  done
                </button>
              )} */}

              <input
                style={{ marginLeft: "5px" }}
                type="checkbox"
                onClick={() => doneTask(task.id)}
                checked={task.done}
                disabled={offEdit}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Task;
