import React from "react";
import { Range } from "react-range";

interface SeekerProps {
  values: number[];
  handleRangeChange: (values: number[]) => void;
  isSongLoading: boolean;
}

export const Seeker: React.FC<SeekerProps> = ({
  values,
  handleRangeChange,
  isSongLoading,
}) => {
  return (
    <Range
      step={0.1}
      min={0}
      max={100}
      values={values}
      onChange={handleRangeChange}
      disabled={isSongLoading}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className="bg-gray-500/50 w-full h-[6px] rounded-md relative"
        >
          <div
            className="absolute h-full bg-white z-10"
            style={{
              width: `${values[0]}%`,
              borderRadius: "4px 0 0 4px",
            }}
          />
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="h-0 w-0 bg-white rounded-full flex items-center justify-center cursor-pointer z-20"
        />
      )}
    />
  );
};
