import { Outlet } from "react-router-dom";
import "./App.css";

import ThemeProvider from "./components/hoc/test/contexts/ThemeContext";

import UserProvider from "./components/hoc/test/contexts/UserContext";
function App() {
  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <Outlet />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
