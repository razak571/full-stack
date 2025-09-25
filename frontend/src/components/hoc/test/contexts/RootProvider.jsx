import UserProvider from "./UserProvider";
import ThemeProvider from "./ThemeProvider";

import ThemeProviderr from "./ThemeContext";
import UserProviderr from "./UserContext";

// eslint-disable-next-line react/prop-types
const RootProvider = ({ children }) => {
  return (
    <ThemeProviderr>
      <UserProviderr>
        <ThemeProvider>
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </UserProviderr>
    </ThemeProviderr>
  );
};

export default RootProvider;
