import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../service/auth";
import { User } from "../../type";
// type obj = User & objectId;
const initialState: {
  user: User | null;

  loading: boolean;
  error: string | null;
  success: boolean;
} = {
  user: null,
  loading: false,
  error: null,
  success: false,
};
export const signUp = createAsyncThunk("signUp", async (row: User, api) => {
  try {
    return await authService.registerUser(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(
      (error as { response: { data: { message: string } } })?.response?.data
        ?.message
    );
  }
});
export const signIn = createAsyncThunk("signIn", async (keyword: User, api) => {
  try {
    return await authService.loginUser(keyword);
  } catch (error) {
    console.log(error);
    return api.rejectWithValue(
      (error as { response: { data: { message: string } } })?.response?.data
        ?.message
    );
  }
});
export const googleAuth = createAsyncThunk(
  "googleAuth",
  async (keyword: User, api) => {
    try {
      return await authService.googleUser(keyword);
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const facebookAuth = createAsyncThunk(
  "facebookAuth",
  async (keyword: User, api) => {
    try {
      return await authService.facebookUser(keyword);
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const signOut = createAsyncThunk("signOut", async () => {
  return await authService.logout();
});
export const forget = createAsyncThunk(
  "forget",
  async (keyword: { email: string }, api) => {
    try {
      return await authService.forgetPassword(keyword);
    } catch (error) {
      console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const reset = createAsyncThunk(
  "reset",
  async (keyword: { id: string; password: string; cpassword: string }, api) => {
    try {
      return await authService.resetPassword(keyword);
    } catch (error) {
      console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
        state.success = true;
        state.error = null;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
        state.success = true;
        state.error = null;
      })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
        state.success = true;
        state.error = null;
      })
      .addCase(facebookAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(facebookAuth.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(facebookAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
        state.success = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.success = false;
      })
      .addCase(forget.pending, (state) => {
        state.loading = true;
      })
      .addCase(forget.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(forget.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(reset.pending, (state) => {
        state.loading = true;
      })
      .addCase(reset.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(reset.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      });
  },
});
export default authSlice.reducer;
