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
const ComponentA = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, name: "razak" });
  return (
    <>
      <h1>
        count: {state.count} name: {state.name}{" "}
      </h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button> <br />
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
};

export default ComponentA;
