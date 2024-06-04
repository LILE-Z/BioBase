import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer initialRouteName="index">
          <Drawer.Screen
            name="index"
            options={{
              drawerItemStyle: {
                display: "none",
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="registro"
            options={{
              drawerItemStyle: {
                display: "none",
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="+not-found"
            options={{
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
          <Drawer.Screen
            name="menu"
            options={{
              title: "Menu",
              headerShown: true,
              headerTitle: "Menu",
              headerStyle: {
                backgroundColor: "#9ecac9",
              },
            }}
          />
          <Drawer.Screen
            name="respiratorio"
            options={{
              title: "Respiratorio",
              headerShown: true,
              headerTitle: "Respiratorio",
              headerStyle: {
                backgroundColor: "#f0d9e5",
              },
            }}
          />
          <Drawer.Screen
            name="digestivo"
            options={{
              title: "Digestivo",
              headerShown: true,
              headerTitle: "Digestivo",
              headerStyle: {
                backgroundColor: "#e0f0d9",
              },
            }}
          />
          <Drawer.Screen
            name="nervioso"
            options={{
              title: "Nervioso",
              headerShown: true,
              headerTitle: "Nervioso",
              headerStyle: {
                backgroundColor: "#d9e5f0",
              },
            }}
          />
          <Drawer.Screen
            name="oseo"
            options={{
              title: "Oseo",
              headerShown: true,
              headerTitle: "Oseo",
              headerStyle: {
                backgroundColor: "#f0e9d9",
              },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
