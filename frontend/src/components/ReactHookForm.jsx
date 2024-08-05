import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ReactHookForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      age: 18,
      gender: "",
      city: "",
      state: "",
      startDate: "",
      newsLetters: "",
    },
  });

  const registerUser = (data) => {
    // e.preventDefault();
    console.log("data :: ", data);
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(registerUser)}>
        <div>
          <div>
            <label>Fullname:</label>
            <input
              type="text"
              placeholder="Enter fullname"
              {...register("fullname", {
                required: "Fullname is required",
              })}
            />
            {errors.fullname && (
              <p style={{ color: "orangered" }}>{errors.fullname.message} </p>
            )}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid Email Address",
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "orangered" }}>{errors.email.message} </p>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message} </p>
            )}
          </div>
          <div>
            <label htmlFor="">Age:</label>
            <input
              type="number"
              placeholder="Enter age"
              {...register("age", {
                required: "Age is require",
                min: { value: 18, message: "age must be atleast 18" },
              })}
            />
            {errors.age && (
              <p style={{ color: "orangered" }}>{errors.age.message} </p>
            )}
          </div>
          <div>
            <label htmlFor="">Gender:</label>
            <select {...register("gender", { required: "Gender is required" })}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {errors.gender && (
              <p style={{ color: "orangered" }}>{errors.gender.message} </p>
            )}
          </div>
          <div>
            <label htmlFor="">Address</label>
            <input
              type="text"
              placeholder="Enter city"
              {...register("city", {
                required: "City is required",
              })}
            />
            {errors.city && (
              <p style={{ color: "orangered" }}>{errors.city.message} </p>
            )}
            <input
              type="text"
              placeholder="Enter state"
              {...register("state", {
                required: "State is required",
              })}
            />
            {errors.state && (
              <p style={{ color: "orange" }}>{errors.state.message} </p>
            )}
          </div>
          <div>
            <label htmlFor="">Start Date:</label>
            <input
              type="date"
              {...register("startDate", {
                required: "Start Date is required",
              })}
            />
            {errors.startDate && (
              <p style={{ color: "orangered" }}>{errors.startDate.message} </p>
            )}
          </div>
          <div>
            <label htmlFor="">Subscribe to Neswletters:</label>
            <input type="checkbox" {...register("newsLetters")} />
            {errors.newsLetters && (
              <p style={{ color: "orangered" }}>
                {errors.newsLetters.message}{" "}
              </p>
            )}
          </div>
          {errors.root && (
            <p style={{ color: "red" }}>{errors.root.message} </p>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submiting..." : "Submit"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReactHookForm;
