import { useNavigate } from "react-router-dom";
const Form = () => {
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    console.log("Form Submited");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const gender = formData.get("gender");
    const age = formData.get("age");
    const city = formData.get("city");
    const state = formData.get("state");
    const date = formData.get("date");
    const checkbox = formData.get("checkbox");
    const radio = formData.get("lang");

    if (!name || !email || !password || !confirmPassword) {
      return alert("All fields are required");
    }

    if (password !== confirmPassword) {
      return alert("Password do not matched");
    }

    const userData = {
      success: true,
      data: {
        name: name,
        email: email,
        password: password,
        passconfirmPasswordword: confirmPassword,
        gender: gender,
        age: age,
        city: city,
        state: state,
        date: date,
        checkbox: checkbox,
        radio: radio,
      },
    };

    console.log("useData :: ", userData);

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
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm password"
              name="confirmPassword"
            />
          </div>
          <div>
            <label>Gender:</label>
            <select name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Age:</label>
            <input type="number" placeholder="Enter Age" name="age" />
          </div>
          <div>
            <label>Address</label>
            <input type="text" placeholder="City" name="city" />
            <input type="text" placeholder="State" name="state" />
          </div>
          <div>
            <label>Date:</label>
            <input type="date" name="date" />
          </div>
          <div>
            <label>Subscribe to Newsletters</label>
            <input type="checkbox" name="checkbox" />
          </div>
          <div>
            <input type="radio" name="lang" id="HTML" />
            <label htmlFor="HTml">HTML</label>
            <input id="css" type="radio" name="lang" />
            <label htmlFor="css">CSS</label>
            <input id="js" type="radio" name="lang" />
            <label htmlFor="js">JS</label>
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default Form;
