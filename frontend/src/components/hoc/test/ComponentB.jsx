import React from "react";

// eslint-disable-next-line react/prop-types, react/display-name
const ComponentB = React.memo(({ increment }) => {
  console.log("child re rendered");

  return (
    <>
      <button onClick={() => increment()}>Call increment</button>
    </>
  );
});

export default ComponentB;
