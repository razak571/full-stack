// import { Checkbox } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

const TodoTest = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "react",
      done: false,
      edit: false,
      isChecked: false,
    },
    {
      id: 2,
      name: "node",
      done: false,
      edit: false,
      isChecked: false,
    },
  ]);

  const taskRef = useRef();

  const createTask = () => {
    const newTask = {
      id: Date.now(),
      name: taskRef.current.value,
      done: false,
      edit: false,
      isChecked: false,
    };

    setTasks([...tasks, newTask]);

    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    taskRef.current.value = "";
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks"))) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    } else {
      setTasks(tasks);
    }
  }, []);

  const doneTask = (id) => {
    const filteredTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    setTasks(filteredTasks);

    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };
  const [tempTask, setTempTask] = useState(null);
  const [timer, setTimer] = useState(5);
  const timerRef = useRef();
  const [edit, setEdit] = useState();

  const deleteTask = (id) => {
    setTimer(5);
    const filteredTasks = tasks.filter((task) => task.id !== id);
    const tempoTasks = tasks.find((task) => task.id === id);

    setTasks(filteredTasks);
    setTempTask(tempoTasks);

    setTimeout(() => {
      setTempTask(null);
    }, 5000);

    timerRef.current = setInterval(() => {
      if (timer > 1) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const editTask = (id, name) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, edit: !task.edit } : task
      )
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task) =>
          task.id === id ? { ...task, edit: !task.edit } : task
        )
      )
    );
    setEdit(name);
  };

  const saveTask = (id) => {
    const filteredTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: edit, edit: false } : task
    );

    setTasks(filteredTasks);

    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  console.log(tasks);
  return (
    <>
      <input placeholder="add new task" type="text" ref={taskRef} />
      <button onClick={() => createTask()}>add task</button>
      <br />
      {tempTask && (
        <button
          style={{
            backgroundColor: "grey",
            padding: "5px",
            color: "silver",
            position: "absolute",
            left: "50%",
          }}
          onClick={() => {
            setTasks([...tasks, tempTask]);
            clearInterval(timerRef.current);
            setTempTask(null);
            localStorage.setItem("tasks", JSON.stringify([...tasks, tempTask]));
          }}
        >
          undo {timer}
        </button>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isChecked === true ? (
              <span
                style={{
                  color: "red",
                  opacity: "60%",
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
            ) : (
              <span>
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
            {/* <button
              style={{ border: "1px solid", margin: "2px", padding: "2px" }}
              onClick={() => doneTask(task.id)}
            >
              {task.done === true ? "undone" : "done"}
            </button> */}
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() => {
                const filTask = tasks.map((t) =>
                  t.id === task.id ? { ...t, isChecked: !t.isChecked } : t
                );
                setTasks(filTask);
              }}
            />
            <button
              style={{ border: "1px solid", margin: "2px", padding: "2px" }}
              onClick={() => deleteTask(task.id)}
            >
              delete
            </button>
            {task.edit === false ? (
              <button
                style={{ border: "1px solid", margin: "2px", padding: "2px" }}
                onClick={() => editTask(task.id, task.name)}
              >
                edit
              </button>
            ) : (
              <button
                style={{ border: "1px solid", margin: "2px", padding: "2px" }}
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
