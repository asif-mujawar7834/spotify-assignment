import { useEffect } from "react";
import { LogoSidebar } from "../components/LogoSidebar";
import { SongContainer } from "../components/SongContainer";
import { SongList } from "../components/SongList";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchSongList } from "../apis";
import {
  fetchSongError,
  fetchSongStart,
  fetchSongSuccess,
  setCurrentSong,
  toggleSongList,
} from "../redux/reducers/songSlice";
import { useScreenSize } from "../hooks/useScreenSize";

export const Home = () => {
  const { currentSong, isSongListOpen } = useAppSelector(
    (state) => state.songs
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(fetchSongStart());
        const result = await fetchSongList();
        dispatch(fetchSongSuccess(result));
        dispatch(setCurrentSong(result[0]));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchSongError(err.message));
        }
      }
    };

    loadData();
  }, [dispatch]);

  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize.width <= 800) {
      dispatch(toggleSongList(false));
    } else {
      dispatch(toggleSongList(true));
    }
  }, [screenSize.width, dispatch]);

  return (
    <section
      className={`p-2 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,133px)_minmax(0,432px)_minmax(0,480px)] h-screen overflow-hidden md:p-8 gap-10 md:gap-20 lg:gap-24 justify-around duration-500`}
      style={{ backgroundColor: currentSong?.accent }}
    >
      <div className="hidden lg:block duration-300">
        <LogoSidebar />
      </div>
      <SongList />
      <div
        className={`${
          isSongListOpen ? "hidden" : "block"
        } md:block flex items-center justify-center`}
      >
        <SongContainer />
      </div>
    </section>
  );
};
