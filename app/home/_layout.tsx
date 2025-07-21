import { Stack } from "expo-router";
import "react-native-reanimated";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { addDummyData } from "@/scripts/add-dummydata";

import { SnackbarView } from "@/components/SnackBarView";
import { useAuth } from "@/hooks/useAuth";

export const DATABASE_NAME = "employees";

export default function HomeLayout() {
  const { isLoggedIn } = useAuth();
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      try {
        addDummyData(db);
      } catch (error) {
        console.error("Error adding dummy data:", error);
      }
      console.log("Migration successful!");
    }
    if (error) {
      console.error("Migration error:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen
              name="index"
              options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen
              name="addEmployee"
              options={{ title: "Add Employee" }}
            />
            <Stack.Screen
              name="[employee]"
              options={{ title: "Employee Details" }}
            />
          </Stack.Protected>
        </Stack>
        <SnackbarView />
      </SQLiteProvider>
    </Suspense>
  );
}
