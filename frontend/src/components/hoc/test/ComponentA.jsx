import { useEffect, useState } from "react";

function ComponentA() {
  const [activate, setActivate] = useState(false);
  const [btn, setBtn] = useState(false);
  const [coolDown, setCoolDown] = useState(false);
  const [count, setCount] = useState(12);

  const dispencePaper = () => {
    setActivate(true);
    setCount(12);
  };

  useEffect(() => {
    let clrItr;
    if (activate === true) {
      console.log("dispencing paper, plz wait....");
      setBtn(true);
      setTimeout(() => {
        console.log("dispenced paper done");
        setCoolDown(true);
        clrItr = setInterval(() => {
          setCount((prev) => Math.max(prev - 1, 1));
        }, 1000);
        setTimeout(() => {
          setBtn(false);
          setActivate(false);
          setCoolDown(false);
          // clrItr.clearInterval();
          // setCount(20);
        }, 12000); // cool down time with we can set
      }, 8000); // time took too dispense papaer from machine

      // return () => {
      //   clrItr.setActivate()
      // }
    }
    if (activate === false) {
      clearInterval(clrItr);
    }
  }, [activate]);

  useEffect(() => {
    console.log(`activate: ${activate} || btn:: ${btn} || count: ${count}`);
  }, [activate, btn, count]);

  return (
    <>
      <button disabled={btn} onClick={() => dispencePaper()}>
        dispence
      </button>{" "}
      {coolDown && <span>wait: {count}</span>}
    </>
  );
}

export default ComponentA;
