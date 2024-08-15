import { createSelector } from "@reduxjs/toolkit";

const selectSongsList = (state: { songs: initialStateType }) =>
  state.songs.songsList;
const selectSearchQuery = (state: { songs: initialStateType }) =>
  state.songs.searchQuery;

export const selectFilteredSongs = createSelector(
  [selectSongsList, selectSearchQuery],
  (songsList, searchQuery) => {
    if (!searchQuery) return songsList;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return songsList.filter(
      (song) =>
        song.name.toLowerCase().includes(lowerCaseQuery) ||
        song.artist.toLowerCase().includes(lowerCaseQuery)
    );
  }
);
