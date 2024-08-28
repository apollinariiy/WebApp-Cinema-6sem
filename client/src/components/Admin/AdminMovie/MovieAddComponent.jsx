import React, { useState } from 'react';
import { movieAPI } from "../../../services/MovieService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MenuItem, Typography } from '@mui/material';

const genreList = ['Драма', 'Боевик', 'Комедия'];
const MoviesAddComponent = () => {
    const { data, error, isLoading, refetch } = movieAPI.useFetchAllMoviesQuery();
    const [createMovie, { }] = movieAPI.useCreateMovieMutation();
    const [newMovie, setNewMovie] = useState({
        title: '',
        duration: '',
        genre: '',
        ageLimit: '',
        description: ''
    });
    const [photo, setPhoto] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleAddMovie = async () => {
        await createMovie({ newMovie, movieImage: photo })
            .unwrap()
            .then(() => { alert('Успешно'); window.location.reload(); })
            .catch((error) => alert(JSON.stringify(error.data.message)));

    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', paddingTop: '30px' }}>
            <Typography variant='h4' sx={{ color: 'gray' }}>Добавление фильма</Typography>
            <TextField
                name="title"
                label="Название"
                value={newMovie.title}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
            <TextField
                name="duration"
                label="Продолжительность"
                value={newMovie.duration}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
            <TextField
                select
                name="genre"
                label="Жанр"
                value={newMovie.genre}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            >
                {genreList && genreList.map((movie, index) => (
                    <MenuItem key={index} value={movie}>
                        {movie}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                name="ageLimit"
                label="Возрастное ограничение"
                value={newMovie.ageLimit}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
            <TextField
                name="description"
                label="Описание"
                value={newMovie.description}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
                id="photo-input"
            />
            <label htmlFor="photo-input">
                <Button variant="contained" component="span">
                    Загрузить фото
                </Button>
            </label>
            <Button
                variant="contained"
                onClick={handleAddMovie}
                disabled={!photo}>
                Добавить фильм
            </Button>
            {photo && (
                <div style={{ margin: '20px' }}>
                    <img
                        src={URL.createObjectURL(photo)}
                        alt="Preview"
                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                </div>
            )}
        </Box>
    );
};

export default MoviesAddComponent;
