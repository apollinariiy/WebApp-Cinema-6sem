import React, { useState, useEffect } from 'react';
import { movieAPI } from "../services/MovieService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import { lime, purple } from '@mui/material/colors';
import { useForm } from 'react-hook-form';


const MoviesManagement = () => {
    const { data, error, isLoading, refetch } = movieAPI.useFetchAllMoviesQuery();
    const [newMovie, setNewMovie] = useState({
        title: '',
                duration: '',
                genre: '',
                agelimit: '',
                description: ''
    });
    const [editMovie, setEditMovie] = useState(null);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = async (data) => {
        console.log(data);
        window.location.reload();
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handleAddMovie = async () => {
        try {
            await movieAPI.addMovie(newMovie);
            setNewMovie({
                title: '',
                duration: '',
                genre: '',
                agelimit: '',
                description: ''
            });
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    const handleDeleteMovie = async (id) => {
        try {
            await movieAPI.deleteMovie(id);
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const handleEditMovie = async () => {
        try {
            await movieAPI.editMovie(editMovie.id, editMovie);
            setEditMovie(null);
        } catch (error) {
            console.error('Error editing movie:', error);
        }
    };

    return (
        <Box>
            <h2>Управление фильмами</h2>
            <h3>Добавить новый фильм</h3>
            <TextField
                name="title"
                placeholder="Название"
                value={newMovie.title}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
            <TextField
                name="director"
                label="Режиссер"
                value={newMovie.director}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
            <TextField
                name="genre"
                label="Жанр"
                value={newMovie.genre}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
            <TextField
                name="releaseYear"
                label="Год выпуска"
                value={newMovie.releaseYear}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
            <Button variant="contained" onClick={handleAddMovie}>Добавить фильм</Button>
            <h3>Список фильмов</h3>
            <ul>
                {data && data.map(movie => (
                    <li key={movie.id}>
                        {editMovie?.id === movie.id ? (
                            <Box component="form" sx={{margin:'30px', width:'700px'}}>
                                <TextField
                                    name="title"
                                    label="Название"
                                    value={editMovie.title}
                                    onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })}
                                    fullWidth
                                    sx={{ marginTop: '7px', marginBottom: '7px' }}
                                />
                                <TextField
                                    name="director"
                                    label="Продолжительность"
                                    value={editMovie.duration}
                                    onChange={(e) => setEditMovie({ ...editMovie, duration: e.target.value })}
                                    fullWidth
                                    sx={{ marginTop: '7px', marginBottom: '7px' }}
                                />
                                <TextField
                                    name="genre"
                                    label="Жанр"
                                    value={editMovie.genre}
                                    onChange={(e) => setEditMovie({ ...editMovie, genre: e.target.value })}
                                    fullWidth
                                    sx={{ marginTop: '7px', marginBottom: '7px' }}
                                />
                                <TextField
                                    name="releaseYear"
                                    label="Ограничение"
                                    value={editMovie.ageLimit}
                                    onChange={(e) => setEditMovie({ ...editMovie, ageLimit: e.target.value })}
                                    fullWidth
                                    sx={{ marginTop: '7px', marginBottom: '7px' }}
                                />
                                <TextField
                                    name="releaseYear"
                                    label="Описание"
                                    value={editMovie.description}
                                    onChange={(e) => setEditMovie({ ...editMovie, description: e.target.value })}
                                    fullWidth
                                    sx={{ marginTop: '7px', marginBottom: '7px' }}
                                />
                                <Button variant="contained" type="submit">Сохранить</Button>
                            </Box>
                        ) : (
                            <Box style={{color:'white'}}>
                                <Grid container>
                                <Grid item sm={6}>
                                <strong>{movie.title}</strong> ({movie.Duration}), Жанр: {movie.Genre}, Ограничение: {movie.AgeLimit}
                                </Grid>
                                <Grid item sm={6}>
                                <Button variant="outlined" onClick={() => setEditMovie(movie)}>Редактировать</Button>
                                <Button variant="outlined" onClick={() => handleDeleteMovie(movie.id)}>Удалить</Button>
                                </Grid>
                                </Grid>
                            </Box>
                        )}
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default MoviesManagement;
