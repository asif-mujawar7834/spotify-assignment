import { CiSearch } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  setSearchLoading,
  setSearchQuery,
} from "../../redux/reducers/songSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
export const SearchSongForm = () => {
  const dispatch = useAppDispatch();
  const { searchLoading } = useAppSelector((state) => state.songs);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dispatch(setSearchLoading(true));
    setTimeout(() => {
      dispatch(setSearchQuery(value));
      dispatch(setSearchLoading(false));
    }, 1000);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center font-normal bg-gray-500/30 py-2 px-4 rounded-md text-[18px] placeholder:opacity-60">
        <input
          className="bg-transparent outline-none w-full"
          placeholder="Search song, artist"
          onChange={handleChange}
          value={value}
        />
        {searchLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : value ? (
          <button
            className="text-lg cursor-pointer"
            onClick={() => setValue("")}
          >
            <FaTimes />
          </button>
        ) : (
          <CiSearch className="text-xl" />
        )}
      </div>
    </form>
  );
};
