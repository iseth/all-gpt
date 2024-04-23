import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importar los componentes para las pantallas si son necesarios
import Chat from "./src/Screens/Chat";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Chat">
        <Drawer.Screen name="Chat" component={Chat} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
