import { Link } from "react-router-dom";
import Toggle from "./Toggle";

const Navigation = () => {
  return (
    <div className="bg-gray-400 flex items-center justify-between p-4">
      <div>
        <Link to="/">
          <h1>logo</h1>
        </Link>
      </div>
      <div className="flex-grow"></div>
      <div className="gap-2 flex  ">
        <Link className="hover:text-gray-500  " to="/">
          Home
        </Link>
        <Link className="hover:text-gray-500  " to="/about">
          About
        </Link>
        <Link className="hover:text-gray-500  " to="/register">
          Register
        </Link>
        <Link className="hover:text-gray-500  " to="/login">
          Login
        </Link>
        <Toggle />
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};
export default Navigation;
