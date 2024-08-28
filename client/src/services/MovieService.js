import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../http/axiosBaseQuery'


export const movieAPI = createApi({
    reducerPath: 'movieAPI',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://localhost:4242/movie' }),
    endpoints: (build) => ({
        fetchAllMovies: build.query({
            query: () => ({
                url: `/`,
            })
        }),
        fetchMoviesById: build.query({
            query: (movieId) => ({
                url: `/${movieId}`,
            })
        }),
        fetchMoviesByGenre: build.query({
            query: (genre) => ({
                url: `/genre/${genre}`,
            })
        }),
        updateMovies: build.mutation({
            query: (data) => {
                const {movieID, newMovie} = data;
                return {
                url: `/update/${movieID}`,
                method: 'PUT',
                data: newMovie
            }}
        }),
        deleteMovie: build.mutation({
            query: (movieID) => {
                return {
                url: `/${movieID}`,
                method: 'DELETE'
            }}
        }),
        updateMovieImage: build.mutation({
            query: (data) => {
                const { movieID, movieImage } = data;
                const formData = new FormData();
                formData.append('file', movieImage);
                return {
                    url: `/update/image/${movieID}`,
                    method: 'PUT',
                    data: formData, 
                    headers: {
                        'Content-Type': 'multipart/form-data' 
                    }
                };
            }
        }),
        createMovie: build.mutation({
            query: (data) => {
                const { newMovie, movieImage } = data;
                const formData = new FormData();
                Object.entries(newMovie).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append('file', movieImage);
                return {
                    url: `/create`,
                    method: 'POST',
                    data: formData, 
                    headers: {
                        'Content-Type': 'multipart/form-data' 
                    }
                };
            }
        }),


    })
})
