import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortUrl } from "../../types/urls";

interface IState {
  url: string;
  error: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  links: ShortUrl[];
  myLinks: ShortUrl[];
}

export const urlSlice = createSlice({
  name: "url-shortener",
  initialState: {
    url: "",
    error: "",
    totalPages: 1,
    isLoading: false,
    links: [],
    myLinks: [],
  } as IState,
  reducers: {
    setUrl: (store, action: PayloadAction<string>) => {
      store.url = action.payload;
    },
    setError: (store, action: PayloadAction<string>) => {
      store.error = action.payload;
    },
    setTotalPages: (store, action: PayloadAction<number>) => {
      store.totalPages = action.payload;
    },
    setIsLoading: (store, action: PayloadAction<boolean>) => {
      store.isLoading = action.payload;
    },
    setLinks: (store, action: PayloadAction<ShortUrl[]>) => {
      store.links = action.payload;
    },
    setMyLink: (store, action: PayloadAction<ShortUrl>) => {
      store.myLinks.push(action.payload);
    },
  },
});

export const { setUrl, setError, setTotalPages, setLinks, setMyLink } =
  urlSlice.actions;
export default urlSlice.reducer;
