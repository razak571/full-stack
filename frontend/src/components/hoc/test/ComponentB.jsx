// eslint-disable-next-line react/prop-types
import React from "react";
// eslint-disable-next-line react/display-name, react/prop-types
const ComponentB = React.memo(({ increment }) => {
  console.log("child re-rendered");
  return (
    <>
      <h2>hello</h2>
      <button onClick={increment}>call INC</button>
    </>
  );
});

export default ComponentB;
