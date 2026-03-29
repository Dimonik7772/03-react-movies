import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import css from "./App.module.css";

export default function App() {
   const [movies, setMovies] = useState<Movie[]>([]);
   const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isError, setIsError] = useState<boolean>(false);

   const handleSubmit = async (query: string) => {
      try {
         setIsLoading(true);
         setIsError(false);
         setMovies([]);
         setActiveMovie(null);
         const Movies = await fetchMovies(query);
         if (Movies.length > 0) {
            toast.success("Successfully loaded movies.");
            setMovies(Movies);
         } else {
            toast.error("No movies found for your request.");
         }
      } catch {
         setIsError(true);
         setMovies([]);
      } finally {
         setIsLoading(false);
      }
   };
   const openModal = (movie: Movie) => {
      setActiveMovie(movie);
   };

   const closeModal = () => {
      setActiveMovie(null);
   };
   const hasMovies = movies.length > 0;
   return (
      <div className={css.app}>
         <SearchBar onSubmit={handleSubmit} />

         {isLoading && <Loader />}
         {isError && <ErrorMessage />}
         {hasMovies && <MovieGrid movies={movies} onSelect={openModal} />}
         {activeMovie && (
            <MovieModal movie={activeMovie} onClose={closeModal} />
         )}
         <div>
            <Toaster
               position="top-center"
               reverseOrder={false}
               toastOptions={{
                  success: {
                     style: {
                        background: "#6bcb77",
                        color: "white",
                     },
                  },
                  error: {
                     style: {
                        background: "#ff6b6b",
                        color: "white",
                     },
                  },
               }}
            />
         </div>
      </div>
   );
}
