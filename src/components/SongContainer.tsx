import { useAppDispatch, useAppSelector } from "../redux/store";
import Profile from "../assets/images/Profile.png";
import {
  setNextSong,
  setPrevSong,
  toggleSongList,
} from "../redux/reducers/songSlice";
import { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import { convertPercentageToValue } from "../lib";
import { Seeker } from "./Seeker";
import { Controls } from "./Controls";
import { FaBars } from "react-icons/fa";
import { LazyLoadImageComponent } from "./LazyLoadImageComponent";

export const SongContainer = () => {
  const [key, setKey] = useState(Date.now());
  const { currentSong } = useAppSelector((state) => state.songs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isSongLoading, setIsSongLoading] = useState(true);
  const howlerRef = useRef<ReactHowler>(null);
  const [values, setValues] = useState([0]);

  useEffect(() => {
    const updateSeek = () => {
      if (isPlaying && howlerRef.current) {
        const currentSeek = howlerRef.current.seek() as number;
        const currentDuration = howlerRef.current.duration() as number;

        if (currentSeek && currentDuration) {
          const percentage = (currentSeek / currentDuration) * 100;
          setValues([percentage]);
        }
      }
    };

    const interval = setInterval(updateSeek, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    setValues([0]);
    setKey(Date.now());
    setIsSongLoading(true);
  }, [currentSong?.bannerImg]);

  const dispatch = useAppDispatch();

  const handlePrevSong = () => {
    dispatch(setPrevSong());
  };

  const handleNextSong = () => {
    dispatch(setNextSong());
  };

  const handleRangeChange = (values: number[]) => {
    setValues([values[0]]);
    if (howlerRef.current) {
      howlerRef.current.seek(convertPercentageToValue(values[0], duration));
    }
  };

  const handleLoad = () => {
    if (howlerRef.current) {
      setIsSongLoading(false);
      setDuration(howlerRef.current.duration());
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="max-w-[480px] flex flex-col gap-5">
      <div className="absolute top-4 right-4 left-4 flex justify-between items-center md:hidden">
        <div>
          <img
            src={Profile}
            className="h-[48px] w-[48px] border border-gray-500/50 rounded-full"
            alt="profile-image"
          />
        </div>
        <button
          className="text-white bg-gray-500/50 font-bold p-3 rounded-md"
          onClick={() => {
            dispatch(toggleSongList(true));
          }}
        >
          <FaBars />
        </button>
      </div>
      {currentSong?.url && (
        <div className="h-0">
          <ReactHowler
            src={currentSong?.url as string}
            playing={isPlaying}
            ref={howlerRef}
            onLoad={handleLoad}
            onEnd={() => setIsPlaying(false)}
          />
        </div>
      )}
      <div className="text-white">
        <h2 className="font-bold text-[32px]">{currentSong?.name}</h2>
        <p className="text-sm font-normal opacity-60 mt-1">
          {currentSong?.artist}
        </p>
      </div>

      <LazyLoadImageComponent
        key={key.toString()}
        alt={currentSong?.url}
        src={currentSong?.bannerImg}
        className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[400px] xl:h-[420px] object-center rounded-md animate-fadeIn"
      />

      <Seeker
        values={values}
        handleRangeChange={handleRangeChange}
        isSongLoading={isSongLoading}
      />

      <Controls
        handlePrevSong={handlePrevSong}
        togglePlay={togglePlay}
        isSongLoading={isSongLoading}
        isPlaying={isPlaying}
        handleNextSong={handleNextSong}
        values={values}
      />
    </section>
  );
};
