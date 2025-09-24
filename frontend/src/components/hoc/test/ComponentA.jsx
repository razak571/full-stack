import { useContext } from "react";
import { ThemeContext } from "../../../App";

import { UserContext } from "./contexts/UserProvider";

function ComponentA() {
  const { theme, setTheme } = useContext(ThemeContext);

  const { user, setUser } = useContext(UserContext);

  console.log(user);

  return (
    <>
      <h1>theme: {theme} </h1>
      <h1>user: {user ? user.name : "Guest"} </h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Change Theme
      </button>
      <button onClick={() => setUser({ name: "Razak" })}>Set User name</button>
    </>
  );
}

export default ComponentA;
