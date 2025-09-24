import { Outlet } from "react-router-dom";
import "./App.css";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

import Userprovider from "../src/components/hoc/test/contexts/UserProvider";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    console.log(theme);
  }, [theme]);
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Userprovider>
          <Outlet />
        </Userprovider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
