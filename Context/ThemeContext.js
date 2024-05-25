import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext({
  refresh: false,
  setRefresh: () => {},
  loadData: false,
  setLoadData: () => {},
  optionModel: {},
  setOptionModel: () => {},
  enableSelect: false,
  setEnableSelect: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [enableSelect, setEnableSelect] = useState(false);
  const [optionModel, setOptionModel] = useState({
    version: "3.5",
    title: "ChatGPT 3.5",
    model: "gpt-3.5-turbo",
    iconName: "flash-outline",
    collectionName: "Ionicons",
    api: "openai",
  });

  return (
    <ThemeContext.Provider
      value={{
        refresh,
        setRefresh,
        loadData,
        setLoadData,
        optionModel,
        setOptionModel,
        enableSelect,
        setEnableSelect,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
