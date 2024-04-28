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

const Drawer = createDrawerNavigator();

const App = () => {
  const options = [
    {
      version: "3.5",
      title: "GPT-3.5",
      model: "gpt-3.5-turbo",
      iconName: "flash-outline",
      collectionName: "Ionicons",
    },
    {
      version: "4",
      title: "GPT-4",
      model: "gpt-4",
      iconName: "sparkles-outline",
      collectionName: "Ionicons",
    },
  ];
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Chat">
          <Drawer.Screen
            options={{
              title: "ChatGPT",
              headerTitleAlign: "center",
              headerTitle: () => (
                <HeaderTitle options={options} title="ChatGPT" />
              ),
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
