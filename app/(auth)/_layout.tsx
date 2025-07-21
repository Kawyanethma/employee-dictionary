import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();
  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Login" }}
        />
      </Stack.Protected>
    </Stack>
  );
}
