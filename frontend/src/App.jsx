import { Outlet } from "react-router-dom";
import "./App.css";

// import RootProvider from "../src/components/hoc/test/contexts/RootProvider";

import RootProvider from "./components/hoc/test/TestContexts/RootProvider";

function App() {
  return (
    <>
      <RootProvider>
        <Outlet />
      </RootProvider>
    </>
  );
}

export default App;
