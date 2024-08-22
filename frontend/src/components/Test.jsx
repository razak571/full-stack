import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Test = () => {
  const mutation = useMutation({
    mutationFn: async (userData) => {
      await axios.post("/user", userData);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const password = formData.get("password");

    const userData = {
      name: name,
      password: password,
    };
    mutation.mutate(userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          className="text-black"
          name="name"
          type="text"
          placeholder="eneter name"
        />
        <label>Password:</label>
        <input
          className="text-black"
          name="password"
          type="password"
          placeholder="eneter password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Test;
