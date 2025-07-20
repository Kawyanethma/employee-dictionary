import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import  migrations  from "@/drizzle/migrations";

import { useColorScheme } from "@/hooks/useColorScheme";
import { addDummyData } from "@/scripts/add-dummydata";

export const DATABASE_NAME = "employees";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (success) {
      try{
        addDummyData(db);
      }catch (error) {
        console.error("Error adding dummy data:", error);
      }
      console.log("Migration successful!");
    }
    if (error) {
      console.error("Migration error:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  if (!loaded) {
    return null;
  }
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
