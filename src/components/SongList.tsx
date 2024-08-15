import { SearchSongForm } from "./forms/SearchSongForm";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setCurrentSong, toggleSongList } from "../redux/reducers/songSlice";
import { selectFilteredSongs } from "../redux/selectors/songSelector";
import { FaBars } from "react-icons/fa";

export const SongList = () => {
  const {
    fetchLoading,
    fetchError,
    searchLoading,
    isSongListOpen,
    currentSong,
  } = useAppSelector((state) => state.songs);
  const songsList = useAppSelector(selectFilteredSongs);
  const dispatch = useAppDispatch();

  const loadingAnimation = (
    <div className="text-white flex justify-center">
      <AiOutlineLoading3Quarters className="my-20 text-3xl font-bold animate-spin" />
    </div>
  );

  if (fetchLoading) {
    return loadingAnimation;
  }

  if (fetchError) {
    return (
      <div>
        <h1>{fetchError}</h1>
      </div>
    );
  }

  const handleSongSelect = (song: songType) => {
    dispatch(setCurrentSong(song));
  };

  const renderSongList = (
    <div className="flex flex-col flex-grow gap-y-1 overflow-y-auto">
      {songsList?.map((song) => (
        <div
          className={`flex cursor-pointer p-3 items-center rounded-md duration-300 ${
            currentSong?.id === song.id && "bg-gray-500/30"
          } hover:bg-gray-500/30`}
          key={song.id}
          onClick={() => handleSongSelect(song)}
        >
          <img
            src={song.bannerImg}
            className="h-[48px] w-[48px] rounded-full"
            alt="song-image"
          />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-normal">{song.name}</h3>
            <span className="text-sm opacity-50">{song.artist}</span>
          </div>
          <span className="text-lg opacity-50 font-normal">4:06</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`${
        isSongListOpen
          ? "h-full md:flex md:flex-col overflow-hidden px-4 text-white gap-6 duration-500"
          : "hidden"
      }`}
    >
      <div className="block absolute right-4 top-4 md:hidden">
        <button
          className="text-white bg-gray-500/50 font-bold p-3 rounded-md"
          onClick={() => {
            dispatch(toggleSongList(false));
          }}
        >
          <FaBars />
        </button>
      </div>
      <div className="py-4 flex flex-col gap-6">
        <div className="flex gap-8 mb-1">
          <h2 className="text-2xl font-bold text-[#FFFFFF]">For You</h2>
          <h2 className="text-2xl font-bold text-[#FFFFFF] opacity-50">
            Top Tracks
          </h2>
        </div>
        <SearchSongForm />
      </div>

      {searchLoading ? (
        loadingAnimation
      ) : songsList.length === 0 ? (
        <h1 className="my-5 mx-4">
          Oops! We couldn't find what you're looking for. Maybe try a different
          search?
        </h1>
      ) : (
        renderSongList
      )}
    </div>
  );
};
