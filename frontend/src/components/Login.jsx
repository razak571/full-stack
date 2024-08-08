import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../redux/api/services/users";

const loginShema = z
  .object({
    email: z.string().email("Invalid Email Address"),
    password: z.string().min(4, "Password must be atleast 4 character"),
    confirmPassword: z
      .string()
      .min(4, "Confirm Password must be atleast 4 character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password must match Password",
    path: ["confirmPassword"],
  });

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(loginShema),
  });

  const [loginUser] = useLoginUserMutation();
  const handleLogin = (data) => {
    const res = loginUser(data).unwrap();
    console.log("res : : ", res);
  };
  return (
    <div className="flex justify-center  mt-20">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className="ml-2"
            />
            {errors.email && (
              <p style={{ color: "orangered" }}>{errors.email.message} </p>
            )}
          </div>
          <div>
            <label htmlFor="">Enter Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password")}
              className="ml-2"
            />
            {errors.password && (
              <p style={{ color: "orangered" }}>{errors.password.message} </p>
            )}
          </div>
          <div>
            <label htmlFor="">Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="ml-2"
            />
            {errors.confirmPassword && (
              <p style={{ color: "orangered" }}>
                {errors.confirmPassword.message}{" "}
              </p>
            )}
          </div>
          <button
            className="bg-gray-400 p-2 mt-2 rounded-lg hover:bg-gray-500 text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
