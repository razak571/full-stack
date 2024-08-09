import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center gap-2 mt-4 text-white">
      <h1>welcome dude </h1>
      <p>
        login to proceed. Have no account?{" "}
        <Link to="/register" style={{ color: "teal" }}>
          sing
        </Link>
      </p>
    </div>
  );
};
export default Home;
