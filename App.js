import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Chat from "./app/Chat";
import { ThemeProvider } from "./app/Context/ThemeContext";
import HeaderRight from "./src/Components/Headers/HeaderRight";
import HeaderTitle from "./src/Components/Headers/HeaderTitle";
import Settings from "./app/Settings";
import { MenuProvider } from "react-native-popup-menu";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <MenuProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Chat">
            <Drawer.Screen
              options={{
                title: "ChatGPT",
                headerTitleAlign: "center",
                headerTitle: () => (
                  <View>
                    <HeaderTitle />
                  </View>
                ),
                headerRight: () => <HeaderRight />,
              }}
              name="Chat"
              component={Chat}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </MenuProvider>
  );
};

export default App;
