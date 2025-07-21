import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, logout, selectAuth } from "@/redux/slices/auth";
import { useRouter } from "expo-router";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector(selectAuth);

  return {
    isLoggedIn: auth.isLoggedIn,
    login: () => {
      dispatch(login());
      router.replace("/home");
    },
    logout: () => {
      dispatch(logout());
      router.replace("/(auth)");
    },
  };
}
