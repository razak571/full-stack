import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeProvider";

import { UserContext } from "./contexts/UserProvider";

function ComponentA() {
  const { theme, setTheme } = useContext(ThemeContext);

  const { user, setUser } = useContext(UserContext);

  console.log(user);

  return (
    <>
      <h1>Theme: {theme} </h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <h1>User: {user ? `${user.name} (${user.role})` : "Guest"} </h1>
      {/* <button onClick={() => setUser({ name: "Razak", role: "Developer" })}>
        Set User name
      </button> */}
    </>
  );
}

export default ComponentA;
