export const fetchSongList = async (): Promise<songType[] | string> => {
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
  } catch (error) {
    if (error instanceof Error) {
      return error.message as string;
    }
    return "Something went wrong!.";
  }
};

export const fetchSongBanner = async (coverImageId: string) => {
  try {
    const res = await fetch(`https://cms.samespace.com/assets/${coverImageId}`);
    if (!res.ok) {
      throw new Error("Something went wrong while fetching API!.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
