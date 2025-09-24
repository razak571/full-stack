import { useContext } from "react";
import { ThemeContext } from "../../../App";

const ComponentB = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <h5>B I am: {theme}</h5>
    </>
  );
};

export default ComponentB;
