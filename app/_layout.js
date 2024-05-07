import { Stack } from "expo-router";
import { Platform, Text } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { ThemeProvider } from "../Context/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function HomeLayout() {
  if (Platform.OS !== "web") {
    console.log(`Platform.OS: `, Platform.OS);

    const {
      polyfill: polyfillEncoding,
    } = require("react-native-polyfill-globals/src/encoding");
    const {
      polyfill: polyfillFetch,
    } = require("react-native-polyfill-globals/src/fetch");
    const {
      polyfill: polyfillReadableStream,
    } = require("react-native-polyfill-globals/src/readable-stream");
    const {
      polyfill: polyfillURL,
    } = require("react-native-polyfill-globals/src/url");
    polyfillFetch();
    polyfillURL();
    polyfillEncoding();
    polyfillReadableStream();
  }
  return (
    <>
      <MenuProvider>
        <ThemeProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                // Hide the header for all other routes.
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="settings/index"
              title="Settings"
              options={{
                // Set the presentation mode to modal for our modal route.
                headerTitle: "Settings",
                presentation: "modal",
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="settings/api-keys"
              options={{
                // Set the presentation mode to modal for our modal route.
                title: "Api Keys",
                presentation: "modal",
                // headerShown: false,
              }}
            />
            <Stack.Screen
              name="settings/update/[api]"
              options={({ route }) => ({
                // Set the presentation mode to modal for our modal route.
                presentation: "modal",
                // Definir el título de la pantalla utilizando el valor del parámetro api
                headerTitle: route.params.api,
                // Puedes definir aquí opciones adicionales para esta ruta si lo deseas.
              })}
            />
          </Stack>
        </ThemeProvider>
      </MenuProvider>
    </>
  );
}
