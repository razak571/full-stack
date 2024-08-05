// // import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

// // const Navigation = () => {
// //   return (
// //     <div className="m-2">
// //       <div className="right-2 text-red-500">
// //         <Link className="" to="/">
// //           Home
// //         </Link>
// //         <Link to="/about">About</Link>
// //         <Link to="/contact">Contact</Link>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Navigation;

// import { Link } from "react-router-dom";

// const Navigation = () => {
//   return (
//     <div className="flex justify-between items-center  p-4  bg-gray-400  ">
//       <div>
//         <h1>logo</h1>
//       </div>
//       <div className="flex-grow"></div>
//       <div className="gap-4 flex justify-center">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//       </div>
//       <div className="flex-grow"></div>
//     </div>
//   );
// };

// export default Navigation;

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
        <Link className="hover:text-gray-500  " to="/contact">
          Contact
        </Link>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};
export default Navigation;
