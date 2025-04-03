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
    // console.log(JSON.parse(localStorage.getItem("tasks")).length);
    if (JSON.parse(localStorage.getItem("tasks"))) {
      //   alert("if");
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    } else {
      //   alert("else");
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

  const deleteDone = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

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

  return (
    <>
      <input placeholder="add new task" type="text" ref={todoRef} />
      <button onClick={() => addNewTask()}>add task</button>
      <ul>
        {tasks?.map((task) => (
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
            ) : //   <span key={task.id}>{task.name}</span>
            task?.edit === true ? (
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
