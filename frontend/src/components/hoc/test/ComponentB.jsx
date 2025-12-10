import React from "react";
// eslint-disable-next-line react/display-name
const ComponentB = React.memo(({ onClick }) => {
  console.log("child re rendered");
  return <></>;
});

export default ComponentB;
