import { useContext } from "react";
import { ThemeContext } from "../../../App";

function ComponentA() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <h1>Theme: {theme}</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Change Theme
      </button>
    </>
  );
}

export default ComponentA;
