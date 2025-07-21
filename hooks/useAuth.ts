import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, logout, selectAuth } from "@/redux/slices/auth";
import { useRouter } from "expo-router";
import { useSnackBar } from "./useSnackBar";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector(selectAuth);
  const { showSnackBar } = useSnackBar();

  // Mocked PIN for demonstration purposes
  const MOCKED_PIN = process.env.EXPO_PUBLIC_MOCKED_PIN || "1234";

  const loginWithPin = (pin: string) => {
    // Here you can add logic to validate the pin if needed
    if (pin !== MOCKED_PIN) {
      showSnackBar("Invalid PIN. Please try again.");
      return;
    }
    // Dispatch the login action if the pin is valid
    showSnackBar("Login successful!");
    dispatch(login());
    router.replace("/home");
  };

  return {
    isLoggedIn: auth.isLoggedIn,
    login: loginWithPin,
    logout: () => {
      dispatch(logout());
      router.replace("/(auth)");
    },
  };
}
