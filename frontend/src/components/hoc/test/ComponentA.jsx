import { useEffect, useRef, useState } from "react";

function ComponentA() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "react",
    },
    {
      id: 2,
      task: "node",
    },
  ]);

  // let id = 3;
  const idRef = useRef(3);
  const createTask = () => {
    // const date = new Date();
    // console.log(date);
    const newTask = { id: idRef.current, task: `task ${idRef.current}` };
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

  return (
    <>
      <button onClick={() => createTask()}>add todo</button>
      {todos?.map((todo) => (
        <h3 key={todo.id}>{todo.task} </h3>
      ))}
    </>
  );
}

export default ComponentA;
