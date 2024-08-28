import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { hallAPI } from '../../../services/HallService';
import { NavLink, useHistory } from 'react-router-dom';
import { movieAPI } from '../../../services/MovieService';

const MovieMenegerComponent = () => {
    const { data, error, isLoading, refetch } = movieAPI.useFetchAllMoviesQuery();
    const [deleteMovie, { }] = movieAPI.useDeleteMovieMutation();

    const handleDelete = async (movieId) => {
        try {
            await deleteMovie(movieId);
            refetch();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', paddingTop: '30px' }}>
            <Typography variant="h4" sx={{color:'gray'}}>Список фильмов</Typography>
            {data && (data.map((movie) => (
                <Card key={movie.id} sx={{ marginBottom: '1rem' }}>
                    <CardContent >
                        <Typography>ID: {movie.id}</Typography>
                        <Typography>Название: {movie.title}</Typography>
                        <Typography>Проложительность: {movie.duration}</Typography>
                        <Typography>Жанр: {movie.genre}</Typography>
                        <Typography>Возрастное ограничение: {movie.ageLimit}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() => handleDelete(movie.id)}
                        >
                            Удалить
                        </Button>
                        <NavLink to={`/admin/movie/update/${movie.id}`}>
                            <Button
                                size="small">
                                Изменить
                            </Button></NavLink>
                    </CardActions>
                </Card>)
            ))}
        </Box>
    );
};

export default MovieMenegerComponent;
