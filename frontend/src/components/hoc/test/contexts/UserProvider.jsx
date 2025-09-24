import { createContext, useState } from "react";

export const UserContext = createContext();
// eslint-disable-next-line react/prop-types
const Userprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Userprovider;
