import { useContext } from "react";

import { ThemeContext } from "./contexts/ThemeContext";

import { UserContext } from "./contexts/UserContext";
function ComponentA() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  console.log(user);
  return (
    <>
      <h1>Theme: {theme}</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Change Theme
      </button>
      <h1>User: {user ? user.name : "Guest"} </h1>
      <button
        onClick={() =>
          setUser({ ...user, name: "Razak Attar", city: "Bangalore" })
        }
      >
        update user name
      </button>
    </>
  );
}

export default ComponentA;
