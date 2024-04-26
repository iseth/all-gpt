import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importar los componentes para las pantallas si son necesarios
import Chat from "./src/Screens/Chat";
import ModalSelect from "./src/Components/Modals/ModalSelect";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Chat">
        <Drawer.Screen
          options={{
            title: "ChatGPT",
            headerTitleAlign: "center",
            headerTitle: () => (
              <View className="w-full flex-row mt-3 justify-center items-center">
                <View className="flex">
                  <Text className="text-lg font-bold">ChatGPT</Text>
                </View>
                <View className="w-[10%]">
                  <ModalSelect />
                </View>
              </View>
            ),
          }}
          name="Chat"
          component={Chat}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
