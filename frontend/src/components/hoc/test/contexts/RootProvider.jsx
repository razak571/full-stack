import UserProvider from "./UserProvider";
import ThemeProvider from "./ThemeProvider";

// eslint-disable-next-line react/prop-types
const RootProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
