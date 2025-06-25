import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  isGuest: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  setIsGuest: () => {},
});
