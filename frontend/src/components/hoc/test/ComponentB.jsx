/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
// const ComponentB = React.memo(({increment}) => {
//   console.log("re ran child");
//   return <button onClick={increment}>CallIt</button>;
// });

// export default ComponentB;

const ComponentB = React.memo(({ increment }) => {
  console.log("Child rendered"); // to track renders
  return <button onClick={increment}>Increment</button>;
});

export default ComponentB;
