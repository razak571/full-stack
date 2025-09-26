import { useEffect, useRef, useState } from "react";

function ComponentA() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "react",
      done: false,
      edit: false,
    },
    {
      id: 2,
      task: "node",
      done: false,
      edit: false,
    },
  ]);

  // let id = 3;
  // const idRef = useRef(3);
  const createTask = () => {
    const id = Date.now();
    const newTask = {
      id: id,
      // task: `task ${idRef.current}`,
      task: `task${id}`,
      done: false,
      edit: false,
    };

    setTodos([...todos, newTask]);
    localStorage.setItem("task", JSON.stringify([...todos, newTask]));
    // idRef.current += 1;
  };

  useEffect(() => {
    if (localStorage.getItem("task")) {
      const tasks = JSON.parse(localStorage.getItem("task"));
      setTodos(tasks);

      const localTodos = JSON.parse(localStorage.getItem("task"));
      const filteredTodo = localTodos?.filter((todo) => todo.edit === true);
      const editTodo = filteredTodo[0];
      setEdit(editTodo?.task);
    }
  }, []);

  const doneTask = (id) => {
    const updatedTodo = todos?.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodo);
    localStorage.setItem("task", JSON.stringify(updatedTodo));
  };

  const editTask = (id, task) => {
    const updatedTodo = todos?.map((todo) =>
      todo.id === id ? { ...todo, edit: true } : todo
    );

    setTodos(updatedTodo);
    localStorage.setItem("task", JSON.stringify(updatedTodo));
    setEdit(task);
  };

  const handleUpdate = (id) => {
    const updatedTodos = todos?.map((todo) =>
      todo.id === id
        ? { ...todo, task: inputRef.current.value, edit: false }
        : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem("task", JSON.stringify(updatedTodos));
  };

  const inputRef = useRef();
  const [edit, setEdit] = useState("default");

  const deleteTask = (id) => {
    const filteredTodos = todos?.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("task", JSON.stringify(filteredTodos));
  };
  return (
    <>
      <button onClick={() => createTask()}>add todo</button>
      {todos?.map((todo) =>
        todo?.edit ? (
          <span key={todo.id}>
            <input
              type="text"
              style={{ border: "1px solid" }}
              value={edit}
              ref={inputRef}
              onChange={(event) => setEdit(event.target.value)}
            />
            <button onClick={() => handleUpdate(todo.id)}>update</button>
          </span>
        ) : (
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
            <button onClick={() => editTask(todo.id, todo.task)}>edit</button>{" "}
            <button onClick={() => deleteTask(todo.id)}>delete</button>
          </h3>
        )
      )}
    </>
  );
}

export default ComponentA;
