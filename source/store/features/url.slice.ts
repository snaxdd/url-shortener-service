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
      const isExist = store.myLinks.find(
        (link) => Number(link.id) === Number(action.payload.id)
      );

      if (!isExist) {
        store.myLinks.push(action.payload);
      }
    },
    updateLinkClicks: (store, action: PayloadAction<ShortUrl>) => {
      const { clicks, id } = action.payload;
      store.myLinks = store.myLinks.map((item) =>
        Number(item.id) === id
          ? {
              ...item,
              clicks,
            }
          : item
      );
    },
  },
});

export const { setUrl, setError, setMyLink, updateLinkClicks } =
  urlSlice.actions;
export default urlSlice.reducer;
