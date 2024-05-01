import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Chat from "./src/Screens/Chat";
import { ThemeProvider } from "./src/Context/ThemeContext";
import HeaderRight from "./src/Components/Headers/HeaderRight";
import HeaderTitle from "./src/Components/Headers/HeaderTitle";
import Settings from "./src/Screens/Settings";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Chat">
          <Drawer.Screen
            options={{
              title: "ChatGPT",
              headerTitleAlign: "center",
              headerTitle: () => <HeaderTitle />,
              headerRight: () => <HeaderRight />,
            }}
            name="Chat"
            component={Chat}
          />
          <Drawer.Screen
            options={{
              title: "Settings",
              headerTitleAlign: "center",
            }}
            name="Settings"
            component={Settings}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
