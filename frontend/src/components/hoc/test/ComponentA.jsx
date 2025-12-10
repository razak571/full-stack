import { useRef, useState } from "react";

function ComponentA() {
  const countRef = useRef(0);
  const [inc, setInc] = useState(1);
  const handleConter = () => {
    countRef.current = countRef.current + 1;
    console.log(countRef.current);
  };
  console.log("inc ::", inc);
  console.log("counter ::", countRef.current);

  return (
    <>
      <p>
        counter = {countRef.current} || inc = {inc}{" "}
      </p>
      <button onClick={() => setInc((prev) => prev + 1)}>INC ++</button>
      <br></br>
      <button onClick={() => handleConter()}>counter ++</button>
    </>
  );
}

export default ComponentA;
