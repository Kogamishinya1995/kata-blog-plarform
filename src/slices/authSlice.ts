import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  username: string | null;
  email: string | null;
  image: string | null;
};

const initialState: AuthState = {
  token: null,
  username: null,
  email: null,
  image: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<{ token: string; username: string; email: string }>) {
      console.log("Setting auth data:", action.payload);
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearAuthData(state) {
      state.token = null;
      state.username = null;
      state.email = null;
    },
    updateAuthData(state, action: PayloadAction<{ token: string; username: string; email: string, image: string }>) {
      console.log("Setting auth data:", action.payload);
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
  },
});

export const { setAuthData, clearAuthData, updateAuthData } = authSlice.actions;

export default authSlice.reducer;