import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1, name: state.name };
    case "decrement":
      return { count: state.count - 1, name: state.name };
    default:
      return state;
  }
};

function ComponentA() {
  const [state, dispatch] = useReducer(reducer, { count: 0, name: "Razak" });

  return (
    <>
      <h1>
        Count : {state.count} || name: {state.name}{" "}
      </h1>
      <button onClick={() => dispatch({ type: "increment" })}>Count ++</button>{" "}
      <br />
      <button onClick={() => dispatch({ type: "decrement" })}>Count --</button>
    </>
  );
}

export default ComponentA;
