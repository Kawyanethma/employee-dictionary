import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  closeSnackBar,
  openSnackBar,
  selectSnackBar,
} from "@/redux/slices/snackBar";

export function useSnackBar() {
  const dispatch = useAppDispatch();
  const snackBar = useAppSelector(selectSnackBar);

  const showSnackBar = (message: string) => {
    dispatch(openSnackBar(message));
  };

  const hideSnackBar = () => {
    dispatch(closeSnackBar());
  };

  return {
    snackBar,
    showSnackBar,
    hideSnackBar,
  };
}
