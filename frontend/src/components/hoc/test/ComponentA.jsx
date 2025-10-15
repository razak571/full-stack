function ComponentA() {
  const myData = {
    name: "razak",
    age: 16,
  };
  const url = "http://localhost:5000/api/v1/test/95?test=1234&12=razk";
  const jwt = "bshjsdhb11";
  const consumeData = async () => {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
          "Content-Type": "application/json",
          token: jwt,
        },
      });
      if (!res.ok) throw new Error("Error Check :: res.ok not true");
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(`Error Hai : : ${error.message}`);
    }
  };
  return (
    <>
      <h1>hi</h1>
      <button onClick={() => consumeData()}>consume data</button>
    </>
  );
}

export default ComponentA;
