import { useEffect, useRef, useState } from "react";

function ComponentA() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "react",
      done: false,
    },
    {
      id: 2,
      task: "node",
      done: false,
    },
  ]);

  // let id = 3;
  const idRef = useRef(3);
  const createTask = () => {
    // const date = new Date();
    // console.log(date);
    const newTask = {
      id: idRef.current,
      task: `task ${idRef.current}`,
      done: false,
    };
    setTodos([...todos, newTask]);
    localStorage.setItem("task", JSON.stringify([...todos, newTask]));
    idRef.current += 1;
    console.log(idRef.current);
  };

  useEffect(() => {
    if (localStorage.getItem("task")) {
      const tasks = JSON.parse(localStorage.getItem("task"));
      setTodos(tasks);
    }
  }, []);

  const doneTask = (id) => {
    const updatedTodo = todos?.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodo);
    localStorage.setItem("task", JSON.stringify(updatedTodo));
  };

  return (
    <>
      <button onClick={() => createTask()}>add todo</button>
      {todos?.map((todo) => (
        <h3 key={todo.id}>
          {todo.done ? (
            <span
              style={{
                opacity: "50%",
                textDecoration: "line-through",
              }}
            >
              {todo.task}{" "}
            </span>
          ) : (
            todo.task
          )}{" "}
          <button
            onClick={() => {
              doneTask(todo.id);
            }}
          >
            done
          </button>{" "}
        </h3>
      ))}
    </>
  );
}

export default ComponentA;
