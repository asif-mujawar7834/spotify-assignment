interface songType {
  id: number;
  status: string;
  sort: null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  name: string;
  artist: string;
  accent: string;
  cover: string;
  top_track: boolean;
  url: string;
  bannerImg: string;
}

interface initialStateType {
  songsList: songType[] | [];
  themeColor: string;
  textColor: string;
  fetchLoading: boolean;
  fetchError: string;
  searchLoading: boolean;
  currentSong: songType | null;
  searchQuery: string | "";
  isSongListOpen: boolean;
  currentPlayingSongURL: string;
}

interface ReactHowlerRef {
  seek: (value?: number) => number;
  duration: () => number;
}

interface imageProps {
  alt: string | undefined;
  src: string | undefined;
  className: string;
}

interface ControlsTypes {
  handlePrevSong: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
  handleNextSong: () => void;
}
