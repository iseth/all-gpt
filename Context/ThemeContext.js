import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext({
  refresh: false,
  setRefresh: () => {},
  loadData: false,
  setLoadData: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const [loadData, setLoadData] = useState(false);

  return (
    <ThemeContext.Provider
      value={{ refresh, setRefresh, loadData, setLoadData }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
