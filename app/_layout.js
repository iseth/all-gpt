import { Link, Stack, useRouter } from "expo-router";
import { LayoutAnimation, Platform, Text, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { ThemeProvider, useTheme } from "../Context/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

import HeaderTitle from "../Components/Headers/HeaderTitle";
import HeaderRight from "../Components/Headers/HeaderRight";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import Icons from "../Components/Icons/Icon";
import SwipeRow from "../Components/Swipe/SwipeRow";

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

  function CustomDrawerContent(props) {
    const { setLoadData, loadData, setRefresh } = useTheme();
    const [rows, setRows] = useState([]);
    const [idCurrent, setIdCurrent] = useState(null);
    const router = useRouter();
    const db = useSQLiteContext();
    const getAllChats = async () => {
      const allRows = await db.getAllAsync("SELECT * FROM chat");
      console.log(allRows, "allrows");
      setRows(allRows);
    };

    useEffect(() => {
      getAllChats();
    }, []);

    useEffect(() => {
      if (loadData) {
        getAllChats();
        setLoadData(false);
      }
    }, [loadData]);
    const deleteItem = async (id) => {
      await db.runAsync(`DELETE FROM chat WHERE id =${id}`);
      const updateData = rows.filter((d) => d.id !== id);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setRows(updateData);
      if (id === idCurrent) {
        setRefresh(true);
        router.push({
          pathname: "/",
        });
        setIdCurrent(null);
      }
    };

    return (
      <>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label={() => (
              <Text className="text-gray-500 font-semibold">New Chat</Text>
            )}
            onPress={() => {
              setRefresh(true);
              router.push({
                pathname: "/",
              });
            }}
          />
          <View>
            <View className="border border-b-[1px] border-gray-200 mx-2 mb-2" />
            <Text className="text-sm text-gray-500 ml-4">History</Text>
          </View>
          {rows.length > 0 &&
            rows.map((row, index) => (
              <SwipeRow key={row.id} onDelete={() => deleteItem(row.id)}>
                <DrawerItem
                  key={row.id}
                  label={() => (
                    <Text className="text-black font-semibold">
                      {row.title}
                    </Text>
                  )}
                  onPress={() => {
                    setIdCurrent(row.id);
                    router.push({
                      pathname: "/",
                      params: {
                        iden: row.id,
                      },
                    });
                  }}
                />
              </SwipeRow>
            ))}
        </DrawerContentScrollView>
        <DrawerItem
          label={() => (
            <View className="flex-row items-center justify-between">
              <View className="flex-row w-full">
                <Icons
                  icon="user-circle-o"
                  collection="FontAwesome"
                  size={35}
                />
                <Text className="text-black font-semibold ml-3 text-lg">
                  Settings
                </Text>
              </View>

              <View>
                <Icons
                  icon="options"
                  color={"gray"}
                  collection="SimpleLineIcons"
                  size={16}
                />
              </View>
            </View>
          )}
          onPress={() => {
            router.push({
              pathname: "(settings)",
            });
          }}
        />
      </>
    );
  }

  return (
    <SQLiteProvider
      databaseName="all-gpt-database.db"
      assetSource={{
        assetId: require("../assets/database/all-gpt-database.db"),
      }}
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
            <Drawer
              drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
              <Drawer.Screen
                initialParams={{ title: "Home" }}
                name="index"
                options={{
                  drawerLabel: "Home",
                  headerTitleAlign: "center",
                  drawerItemStyle: { display: "none" },
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
                  drawerItemStyle: { display: "none" },
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
