import { useSharedData } from "./useDataShare";

function ComponentA() {
  const shared = useSharedData();

  const handleClk = () => {
    shared.notify("data from ComponentA");
  };
  return (
    <>
      <h1>ComponetA, click to send data</h1>
      <button onClick={handleClk}>SEND</button>
    </>
  );
}

export default ComponentA;
