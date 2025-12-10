import { useContext } from "react";
import { ThemeContext } from "./TestContexts/ThemeProvider";

function ComponentA() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <h1>theme: {theme} </h1>
      <button
        onClick={() => setTheme(() => (theme === "light" ? "dark" : "light"))}
      >
        change Theme
      </button>
    </>
  );
}

export default ComponentA;
