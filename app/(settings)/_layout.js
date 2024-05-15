import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="api-keys"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(update)/[api]"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
