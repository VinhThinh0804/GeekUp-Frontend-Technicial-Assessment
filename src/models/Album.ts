type Album = {
  id: number;
  userId: number;
  title: string;
}

type Photo = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export { Album, Photo };