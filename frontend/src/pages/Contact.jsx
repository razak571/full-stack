import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const handleForm = (e) => {
    e.preventDefault();
    console.log("Form Submited");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("name :: ", name);
    console.log("email :: ", email);
    console.log("pass :: ", password);

    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              //   value={name}
              //   onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              name="name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              name="password"
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default Contact;
