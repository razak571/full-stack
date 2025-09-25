import { Outlet } from "react-router-dom";
import "./App.css";

import RootProvider from "../src/components/hoc/test/contexts/RootProvider";

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
