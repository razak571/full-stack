import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterData } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { useCreateUserMutation } from "../redux/api/services/users";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const { userinfo, status } = useSelector((state) => state.auth);
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

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
    const res = await createUser(data).unwrap();
    dispatch(userRegisterData(res));
    navigate("/");
  };

  useEffect(() => {
    console.log("Updated userinfo and status : : ", userinfo, status);
  }, [userinfo, status]);

  return (
    <div className="flex justify-center p-10 ">
      <form className="p-4 items-center" onSubmit={handleSubmit(userRegister)}>
        <div>
          <div className="">
            <label>FullName:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter fullname"
              {...register("fullname")}
              className="p-2 ml-2"
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
              className="p-2 ml-2"
            />
            {errors.email && (
              <p style={{ color: "palevioletred" }}>{errors.email.message} </p>
            )}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className="p-2 ml-2"
            />
            {errors.password && (
              <p style={{ color: "teal" }}>{errors.password.message} </p>
            )}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="p-2 ml-2"
            />
            {errors.confirmPassword && (
              <p style={{ color: "blueviolet" }}>
                {errors.confirmPassword.message}{" "}
              </p>
            )}
          </div>
          <button
            className="bg-gray-400 p-2 text-white hover:bg-black  rounded-lg mt-2 "
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReactHookFormZod;
