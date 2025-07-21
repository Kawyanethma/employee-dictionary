import { useSnackBar } from "@/hooks/useSnackBar";
import { Snackbar } from "react-native-paper";

export function SnackbarView() {
  const { snackBar, hideSnackBar } = useSnackBar();

  return (
    <Snackbar
      visible={snackBar.isOpen}
      onDismiss={hideSnackBar}
      duration={5000}
    >
      {snackBar.message}
    </Snackbar>
  );
}
