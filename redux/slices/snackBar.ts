import { createSlice } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: {
    isOpen: false,
    message: "",
  },
  reducers: {
    openSnackBar: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    closeSnackBar: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;

interface SnackBarState {
  isOpen: boolean;
  message: string;
}

export const selectSnackBar = (state: {
  snackBar: SnackBarState;
}): SnackBarState => state.snackBar;

export default snackBarSlice.reducer;
