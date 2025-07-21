import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { useColorScheme } from "@/hooks/useColorScheme";

import { store } from "@/redux/store";

export const DATABASE_NAME = "employees";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Provider store={store}>
          <Stack>
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false, title: "Login" }}
            />
            <Stack.Screen
              name="home"
              options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Provider>
      </PaperProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
