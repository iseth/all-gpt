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
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="settings/index"
              title="Settings"
              options={{
                animation: "slide_from_left",
                headerTitle: "Settings",
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="settings/api-keys"
              options={{
                presentation: "card",
                title: "Api Keys",
              }}
            />
            <Stack.Screen
              name="settings/update/[api]"
              options={({ route }) => ({
                presentation: "card",
                headerTitle: route.params.api,
              })}
            />
          </Stack>
        </ThemeProvider>
      </MenuProvider>
    </>
  );
}
