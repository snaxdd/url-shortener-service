import { createSlice } from "@reduxjs/toolkit";

export const urlShortenerSlice = createSlice({
  name: "url-shortener",
  initialState: {
    url: "",
    error: "",
  },
  reducers: {
    setUrl: (store, action) => {
      store.url = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export const { setUrl, setError } = urlShortenerSlice.actions;
export default urlShortenerSlice.reducer;
