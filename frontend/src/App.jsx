import { Outlet } from "react-router-dom";
import "./App.css";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Outlet />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
