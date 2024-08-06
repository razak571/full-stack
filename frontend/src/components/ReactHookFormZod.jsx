import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    fullname: z.string().min(1, "Fullname is required baby"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password atleast should be of 4 characters"),
    confirmPassword: z
      .string()
      .min(4, "Confirm Password atleast should be of 4 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ReactHookFormZod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  const userRegister = async (data) => {
    console.log("data :: ", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(userRegister)}>
        <div>
          <div>
            <label>FullName:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter fullname"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p style={{ color: "green" }}>{errors.fullname.message} </p>
            )}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email address"
              {...register("email")}
            />
            {errors.email && (
              <p style={{ color: "pink" }}>{errors.email.message} </p>
            )}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
            {errors.password && (
              <p style={{ color: "black" }}>{errors.password.message} </p>
            )}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p style={{ color: "blueviolet" }}>
                {errors.confirmPassword.message}{" "}
              </p>
            )}
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReactHookFormZod;
