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

  const todoRef = useRef();
  const [edit, setEditTask] = useState();
  const [filter, setFilter] = useState("all");

  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      name: todoRef.current.value,
      done: false,
      edit: false,
    };

    setTasks([...tasks, newTask]);
    todoRef.current.value = "";
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks"))) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    } else {
      setTasks(tasks);
    }
  }, []);

  const taskDone = (id) => {
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

  const [tempTask, setTempTask] = useState();
  const [timer, setTimer] = useState(5);
  const timerRef = useRef();

  const deleteDone = (id) => {
    setTimer(5);
    const filteredTasks = tasks.filter((task) => task.id !== id);

    const tempoTask = tasks.find((task) => task.id === id);
    console.log(tempoTask);

    setTasks(filteredTasks);
    setTempTask(tempoTask);

    localStorage.setItem("tasks", JSON.stringify(filteredTasks));

    setTimeout(() => {
      setTempTask(null);
    }, 5000);

    timerRef.current = setInterval(() => {
      if (timer > 1) {
        setTimer((pre) => pre - 1);
      } else {
        clearInterval(timerRef.current);
      }
    }, 1000);
  };

  useEffect(() => {
    console.log(tempTask);
  }, [tempTask]);

  const editTask = (id, name) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, edit: true } : task))
    );

    setEditTask(name);
  };

  const saveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: edit, edit: false } : task
    );

    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditTask(""); // ✅ Clear input field after saving
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  return (
    <>
      <input placeholder="add new task" type="text" ref={todoRef} />
      <button onClick={() => addNewTask()}>add task</button>
      {tempTask && (
        <button
          style={{
            marginLeft: "50px",
            backgroundColor: "grey",
            padding: "5px",
            // margin: "10px",
            position: "absolute",
            top: "50px",
            color: "silver",
          }}
          onClick={() => {
            setTasks([...tasks, tempTask]);
            localStorage.setItem("tasks", JSON.stringify([...tasks, tempTask]));
            clearInterval(timerRef.current);
            setTempTask(null);
          }}
        >
          undo {timer}
        </button>
      )}

      <br />
      <button
        style={{ border: "1px solid", margin: "2px", padding: "2px" }}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        style={{ border: "1px solid", margin: "2px", padding: "2px" }}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
      <button
        style={{ border: "1px solid", margin: "2px", padding: "2px" }}
        onClick={() => setFilter("done")}
      >
        Done
      </button>

      <ul>
        {filteredTasks?.map((task) => (
          <li key={task?.id}>
            {task?.done === true ? (
              <span
                style={{
                  color: "red",
                  opacity: "50%",
                  textDecoration: "line-through",
                }}
              >
                {task.name}
              </span>
            ) : task?.edit === true ? (
              <input
                value={edit}
                onChange={(e) => setEditTask(e.target.value)}
              />
            ) : (
              task?.name
            )}
            <button
              onClick={() => taskDone(task.id)}
              style={{ border: "1px solid", padding: "2px", margin: "2px" }}
            >
              done
            </button>
            <button
              onClick={() => deleteDone(task.id)}
              style={{ border: "1px solid", padding: "2px", margin: "2px" }}
            >
              delete
            </button>

            {task.edit === false ? (
              <button
                onClick={() => editTask(task?.id, task?.name)}
                style={{ border: "1px solid", padding: "2px", margin: "2px" }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={() => saveTask(task.id)}
                style={{ border: "1px solid", padding: "2px", margin: "2px" }}
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
