import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateType = {
  songsList: [],
  themeColor: "#000000",
  textColor: "",
  fetchLoading: false,
  fetchError: "",
  searchLoading: false,
  currentSong: null,
  searchQuery: "",
  isSongListOpen: false,
  currentPlayingSongURL: "",
};

const songSlice = createSlice({
  name: "songs",
  initialState: initialState,
  reducers: {
    fetchSongStart: (state) => {
      state.fetchError = "";
      state.fetchLoading = true;
    },
    fetchSongSuccess: (state, action) => {
      state.fetchError = "";
      state.fetchLoading = false;
      state.songsList = action.payload;
    },
    fetchSongError: (state, action) => {
      state.fetchError = action.payload;
      state.fetchLoading = false;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setPrevSong: (state) => {
      const currentSongIndex = state.songsList.findIndex(
        (song) => song.id == state.currentSong?.id
      );
      const nextSongIndex =
        currentSongIndex == 0
          ? state.songsList.length - 1
          : currentSongIndex - 1;
      state.currentSong = state.songsList[nextSongIndex];
    },
    setNextSong: (state) => {
      const currentSongIndex = state.songsList.findIndex(
        (song) => song.id == state.currentSong?.id
      );
      const nextSongIndex =
        currentSongIndex == state.songsList.length - 1
          ? 0
          : currentSongIndex + 1;
      state.currentSong = state.songsList[nextSongIndex];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchLoading: (state, action) => {
      state.searchLoading = action.payload;
    },
    toggleSongList: (state, action) => {
      state.isSongListOpen = action.payload;
    },
    playCurrentSongURL: (state, action) => {
      state.currentPlayingSongURL = action.payload;
    },
  },
});

export const {
  fetchSongError,
  fetchSongStart,
  fetchSongSuccess,
  setCurrentSong,
  setNextSong,
  setPrevSong,
  setSearchQuery,
  setSearchLoading,
  toggleSongList,
  playCurrentSongURL,
} = songSlice.actions;

export default songSlice.reducer;
