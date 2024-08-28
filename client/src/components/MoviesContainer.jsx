import React, { useEffect, useState } from 'react';
import { movieAPI } from "../services/MovieService";
import SessionItem from './MovieItem';
import Grid from '@mui/material/Unstable_Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MovieItem from './MovieItem';
import { Autocomplete, IconButton, InputBase, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const genreList = ['Драма', 'Боевик', 'Комедия'];

const MoviesContainer = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const { data, error, isLoading, refetch } = selectedGenre
        ? movieAPI.useFetchMoviesByGenreQuery(selectedGenre)
        : movieAPI.useFetchAllMoviesQuery();

    useEffect(() => {
        if (selectedGenre) {
            refetch();
        }
    }, [selectedGenre, refetch]);
    return (
        <Box sx={{ flexGrow: 1, width: '90%', margin: 'auto' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={genreList}
                value={selectedGenre}
                onChange={(event, newValue) => setSelectedGenre(newValue)}
                sx={{
                    width: 370,
                    marginBottom: '20px'
                }}
                renderInput={(params) => <TextField {...params} placeholder="Выберите жанр" sx={{ color: 'white' }} />} />
            <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ display: 'flex' }}>
                {data && data.map(movie =>
                    <Grid xs={2} sm={4} md={4} key={movie.id} >
                        <MovieItem movie={movie}></MovieItem></Grid>
                )}
            </Grid>
        </Box>
    );
};

export default MoviesContainer;
