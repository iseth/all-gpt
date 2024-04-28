import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext({
  refresh: false,
  setRefresh: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <ThemeContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </ThemeContext.Provider>
  );
};
