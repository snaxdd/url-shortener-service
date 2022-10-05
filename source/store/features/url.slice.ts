import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortUrl } from "../../types/urls";

interface IState {
  url: string;
  error: string;
  myLinks: ShortUrl[];
}

export const urlSlice = createSlice({
  name: "url-shortener",
  initialState: {
    url: "",
    error: "",
    myLinks: [],
  } as IState,
  reducers: {
    setUrl: (store, action: PayloadAction<string>) => {
      store.url = action.payload;
    },
    setError: (store, action: PayloadAction<string>) => {
      store.error = action.payload;
    },
    setMyLink: (store, action: PayloadAction<ShortUrl>) => {
      store.myLinks.push(action.payload);
    },
  },
});

export const { setUrl, setError, setMyLink } = urlSlice.actions;
export default urlSlice.reducer;
