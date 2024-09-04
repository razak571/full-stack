import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const initialTodos = [
  {
    id: 1,
    title: "HTML",
  },
  {
    id: 2,
    title: "CSS",
  },
  {
    id: 3,
    title: "JS",
  },
];

const fetchTodos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialTodos);
    }, 2000);
  });
};

const addTodo = (newTodo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ id: new Date(), title: newTodo });
      } else {
        reject(new Error("Failed to add Todo"));
      }
    }, 2000);
  });
};
const ReactQueryOptimisticUpdates = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const queryClient = useQueryClient();

  const {
    data: todos,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);
      const newTodoItem = { id: Date.now(), title: newTodo, isNew: true };
      queryClient.setQueryData(["todos"], (old) => [
        ...(old || []),
        newTodoItem,
      ]);
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todos"], (old) =>
        old.map((item) =>
          item.isNew && item.title === variables
            ? { ...data, isNew: false }
            : item
        )
      );
    },
  });

  const handleAddTodo = () => {
    if (newTodoTitle) {
      addTodoMutation.mutate(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {todos?.map((todo) => (
              <li key={todo.id} style={{ opacity: todo.isNew ? 0.5 : 1 }}>
                {todo.title}
                {todo.isNew && " (Adding...)"}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter new todo"
          />
          <button
            className="bg-pink-400 p-5 m-5 rounded-lg hover:bg-pink-500 text-white"
            onClick={handleAddTodo}
            disabled={addTodoMutation.isPending}
          >
            {addTodoMutation.isPending ? "Adding..." : "Add Todo"}
          </button>
          {addTodoMutation.isError && (
            <p style={{ color: "red" }}>
              Error: {addTodoMutation.error.message}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ReactQueryOptimisticUpdates;
