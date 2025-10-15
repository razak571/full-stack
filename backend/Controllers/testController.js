const testController = async (req, res) => {
  console.log(req.params);
  //   console.log(req.query);

  const query = req.query;
  console.log("query params re ::", query);
  const { name, age } = req.body;

  if (!name || !age) {
    throw new Error("send name and age ");
  }
  res.status(200).json({ done: "ok", name: name, age: age });
};

export { testController };
