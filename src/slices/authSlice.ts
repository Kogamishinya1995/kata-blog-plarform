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


interface AuthData {
  token?: string;
  username?: string;
  email?: string;
  image?: string;
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<{ token: string; username: string; email: string, image?: string | null | undefined }>) {
      console.log("Setting auth data:", action.payload);
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      if (action.payload.image !== undefined) {
        state.image = action.payload.image;
      }
    },
    clearAuthData(state) {
      state.token = null;
      state.username = null;
      state.email = null;
      state.image = null;
    },
    updateAuthData(state, action: PayloadAction<AuthData>) { 
      console.log("Setting auth data:", action.payload);
    
      if (action.payload.token !== undefined) {
        state.token = action.payload.token;
      }
      
      if (action.payload.username !== undefined) {
        state.username = action.payload.username;
      }
      
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      
      if (action.payload.image !== undefined) {
        state.image = action.payload.image;
      }
    }    
  },
});

export const { setAuthData, clearAuthData, updateAuthData } = authSlice.actions;

export default authSlice.reducer;