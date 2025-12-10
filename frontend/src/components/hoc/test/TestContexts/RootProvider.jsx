import ThemeProvider from "./ThemeProvider";

// eslint-disable-next-line react/prop-types
const RootProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default RootProvider;
