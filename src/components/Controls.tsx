import { FaEllipsisH, FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useAppSelector } from "../redux/store";

export const Controls: React.FC<ControlsTypes> = ({
  handlePrevSong,
  togglePlay,
  isPlaying,
  handleNextSong,
}) => {
  const { currentPlayingSongURL, currentSong } = useAppSelector(
    (state) => state.songs
  );
  return (
    <div className="flex items-center justify-between gap-5">
      <button className="relative h-[42px] w-[42px] flex items-center justify-center rounded-full bg-gray-500/30 text-white overflow-hidden transition-all duration-300 group">
        <FaEllipsisH className="relative z-10 group-hover:text-black transition-colors duration-400" />
        <span className="rounded-full absolute inset-0 bg-white transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
      </button>
      <div className="w-[176px] flex items-center justify-between">
        <button
          className="rotate-180 relative h-[42px] w-[42px] flex items-center justify-center rounded-full bg-transparent text-white overflow-hidden transition-all duration-300 group"
          onClick={handlePrevSong}
        >
          <TbPlayerTrackNextFilled className="relative z-10 group-hover:text-white transition-colors duration-300 opacity-60" />
          <span className="rounded-full absolute inset-0 bg-gray-500/30 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        </button>
        {currentPlayingSongURL !== currentSong?.url ? (
          <button
            className="duration-300 h-[48px] w-[48px] flex items-center justify-center rounded-full text-[#373A40] bg-white"
            onClick={togglePlay}
          >
            <FaPlay />
          </button>
        ) : (
          <button
            className="duration-300 h-[48px] w-[48px] flex items-center justify-center rounded-full text-[#373A40] bg-white"
            onClick={togglePlay}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        )}

        <button
          className="relative h-[42px] w-[42px] flex items-center justify-center rounded-full bg-transparent text-white overflow-hidden transition-all duration-300 group"
          onClick={handleNextSong}
        >
          <TbPlayerTrackNextFilled className="relative z-10 group-hover:text-white transition-colors duration-300 opacity-60" />
          <span className="rounded-full absolute inset-0 bg-gray-500/30 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        </button>
      </div>
      <button className="relative h-[42px] w-[42px] flex items-center justify-center rounded-full bg-gray-500/30 text-white overflow-hidden transition-all duration-300 group">
        <FaVolumeUp className="relative z-10 group-hover:text-black transition-colors duration-400" />
        <span className="rounded-full absolute inset-0 bg-white transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
      </button>
    </div>
  );
};
