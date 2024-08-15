import { selectFilteredSongs } from "../redux/selectors/songSelector";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setCurrentSong, toggleSongList } from "../redux/reducers/songSlice";
import { FaTimes } from "react-icons/fa";
import { SearchSongForm } from "./forms/SearchSongForm";
import { SongLoadingSkeleton } from "./SongLoadingSkeleton";
import { LazyLoadImageComponent } from "./LazyLoadImageComponent";
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

  const Skeletons = () => {
    const skeletonItems = Array.from({ length: 5 });
    return (
      <div className="space-y-4">
        {skeletonItems.map((_, index) => (
          <SongLoadingSkeleton key={index} />
        ))}
      </div>
    );
  };

  if (fetchLoading) {
    return Skeletons();
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
    <div className="flex flex-col flex-grow gap-y-1 visible">
      {songsList?.map((song) => (
        <div
          className={`flex cursor-pointer p-3 items-center rounded-md duration-300 ${
            currentSong?.id === song.id && "bg-gray-500/30"
          } hover:bg-gray-500/30`}
          key={song.id}
          onClick={() => handleSongSelect(song)}
        >
          <LazyLoadImageComponent
            alt={song.name}
            src={song.bannerImg}
            className="h-[48px] w-[48px] rounded-full"
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
          ? "h-full flex flex-col overflow-hidden px-4 text-white gap-6 duration-500"
          : "hidden"
      }`}
    >
      <div className="block absolute right-4 top-5 md:hidden">
        <button
          className="text-white bg-gray-500/50 font-bold p-3 rounded-md"
          onClick={() => {
            dispatch(toggleSongList(false));
          }}
        >
          <FaTimes />
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
        Skeletons()
      ) : songsList.length === 0 ? (
        <h1 className="my-5 mx-4">
          Oops! We couldn't find what you're looking for. Maybe try a different
          search?
        </h1>
      ) : (
        <div
          className={`${
            isSongListOpen ? "overflow-y-auto invisible hover:visible" : ""
          }`}
        >
          {renderSongList}
        </div>
      )}
    </div>
  );
};
