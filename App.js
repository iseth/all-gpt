import React from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importar los componentes para las pantallas si son necesarios
import Chat from "./src/Screens/Chat";
import ModalSelect from "./src/Components/Modals/ModalSelect";
import Icons from "./src/Components/Icons/Icon";
import { ThemeProvider } from "./src/Context/ThemeContext";
import HeaderRight from "./src/Components/Headers/HeaderRight";
import HeaderTitle from "./src/Components/Headers/HeaderTitle";
import Together from "./src/Screens/Together";

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
              headerTitle: () => <HeaderTitle title="ChatGPT" />,
              headerRight: () => <HeaderRight />,
            }}
            name="Chat"
            component={Chat}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
