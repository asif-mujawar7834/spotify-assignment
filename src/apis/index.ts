export const fetchSongList = async (): Promise<songType[]> => {
  try {
    const res = await fetch("https://cms.samespace.com/items/songs");
    if (!res.ok) {
      throw new Error("Something went wrong while fetching API!.");
    }

    const data = await res.json();
    const songList: songType[] = data?.data;

    songList.map(
      (song) =>
        (song.bannerImg = `https://cms.samespace.com/assets/${song.cover}`)
    );

    return songList;
  } catch {
    throw new Error("Something went wrong while fetching songs list");
  }
};
