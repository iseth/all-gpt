import { Stack } from "expo-router";
import { Platform, Text, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { ThemeProvider } from "../Context/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

import HeaderTitle from "../Components/Headers/HeaderTitle";
import HeaderRight from "../Components/Headers/HeaderRight";

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
    <SQLiteProvider
      databaseName="all-gpt-database.db"
      assetSource={{ assetId: require("../assets/database/all-gpt-database.db") }}
    >
      <MenuProvider>
        <ThemeProvider>
          {/* <Stack>
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
          </Stack> */}
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
              <Drawer.Screen
                name="index"
                options={{
                  drawerLabel: "Home",
                  headerTitleAlign: "center",
                  headerTitle: () => (
                    <View className="justify-center">
                      <HeaderTitle />
                    </View>
                  ),
                }}
              />
              <Drawer.Screen
                name="(settings)"
                options={{
                  headerShown: false,
                  drawerLabel: "Settings",
                  title: "Settings",
                  swipeEdgeWidth: 0,
                }}
              />
              <Drawer.Screen
                name="Settings-old"
                options={{
                  headerShown: false,
                  drawerItemStyle: { display: "none" },
                }}
              />
            </Drawer>
          </GestureHandlerRootView>
        </ThemeProvider>
      </MenuProvider>
    </SQLiteProvider>
  );
}
