// import { Link } from "react-router-dom";
// import ReactHooks from "../components/ReactHooks/ReactHooks";
// import UseCallBack from "../components/ReactHooks/UseCallBack";
// import UseMemoHook from "../components/ReactHooks/UseMemoHook";
// import ExpensiveCalculation from "../components/ReactHooks/UseMemoHook";
// import UseReducer from "../components/ReactHooks/UseReducer";
import PostList from "../components/hoc/components/PostList";
import UserList from "../components/hoc/components/UserList";
// import UseRefHook from "../components/ReactHooks/UseRefHook";
import { withDataFetching } from "../components/hoc/withDataFetching";

// Igonre the code, this is just for practice

const UsersWithFetching = withDataFetching(
  UserList,
  "https://jsonplaceholder.typicode.com/users"
);
const PostsWithFetching = withDataFetching(
  PostList,
  "https://jsonplaceholder.typicode.com/posts?_limit=8"
);

const Home = () => {
  return (
    // <div className=" flex justify-center gap-2 text-white">
    //   {/* <h1>welcome dude </h1>
    //   <p>
    //     login to proceed. Have no account?{" "}
    //     <Link to="/register" style={{ color: "teal" }}>
    //       sing
    //     </Link>
    //   </p> */}
    //   {/* <ReactHooks />
    //   <UseReducer />
    //   <ExpensiveCalculation a={10} b={10} />
    //   <ExpensiveCalculation a={20} b={20} />
    //   <UseMemoHook a={5} b={6} />
    //   <UseCallBack /> */}
    //   {/* <UseRefHook /> */}

    // </div>
    <div className="text-white">
      <UsersWithFetching />
      <hr />
      <PostsWithFetching />
    </div>
  );
};
export default Home;
