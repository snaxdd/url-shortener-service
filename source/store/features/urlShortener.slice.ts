import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortUrl } from "../../types/urls";

interface IState {
  url: string;
  error: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  links: ShortUrl[];
}

export const urlShortenerSlice = createSlice({
  name: "url-shortener",
  initialState: {
    url: "",
    error: "",
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    links: [],
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
    setCurrentPage: (store, action: PayloadAction<number>) => {
      store.currentPage = action.payload;
    },
    setIsLoading: (store, action: PayloadAction<boolean>) => {
      store.isLoading = action.payload;
    },
    setLinks: (store, action: PayloadAction<ShortUrl[]>) => {
      store.links = action.payload;
    },
  },
});

export const {
  setUrl,
  setError,
  setCurrentPage,
  setTotalPages,
  setLinks,
  setIsLoading,
} = urlShortenerSlice.actions;
export default urlShortenerSlice.reducer;
