import { API_KEY, MAX_RESULTS } from "@/constants/app.constant";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface VolumeItems {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    publisher: string;
    publishedDate: string;
    pageCount: number;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    contentRating: string;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
}

export interface VolumeOutput {
  items: VolumeItems[];
  totalItems: number;
  kind: string;
  nextPage: number;
}

const fetchBooks = async (query: string, page = 1) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&startIndex=${
      page * MAX_RESULTS
    }&maxResults=${MAX_RESULTS}`
  );
  const data = await response.json();
  return {
    items: data.items || [],
    nextPage: page,
    totalItems: data.totalItems,
    kind: data.kind,
  } as VolumeOutput;
};

export const useGetVolumes = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["books", query],
    queryFn: ({ pageParam = 1 }) => fetchBooks(query, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
