import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
   results: Movie[];
}
export const axiosInstance = axios.create({
   baseURL: "https://api.themoviedb.org/3",
   headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      Accept: "application/json",
   },
   params: {
      include_adult: false,
      language: "en-US",
      page: 1,
   },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
   const response = await axiosInstance.get<MoviesHttpResponse>(
      "/search/movie",
      {
         params: {
            query,
         },
      },
   );

   return response.data.results;
};
