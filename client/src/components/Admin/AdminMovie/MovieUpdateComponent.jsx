import React, { useEffect, useState } from 'react';
import { movieAPI } from "../../../services/MovieService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Alert, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const MovieUpdateComponent = () => {
    const { movieID } = useParams();
    const { data,error, isLoading, refetch } = movieAPI.useFetchMoviesByIdQuery(movieID);
    const [updateMovie, { error: errorMovie }] = movieAPI.useUpdateMoviesMutation();
    const [updateImage, { error: errorImage }] = movieAPI.useUpdateMovieImageMutation();
    const [newMovie, setNewMovie] = useState({
        title: '',
        duration: '',
        genre: '',
        ageLimit: '',
        description: ''
    });
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (data) {
            setNewMovie({
                title: data[0].title,
                duration: data[0].duration,
                genre: data[0].genre,
                ageLimit: data[0].ageLimit,
                description: data[0].description
            });
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };


    const handleUpdateMovie = async () => {
        await updateMovie({ movieID, newMovie })
            .unwrap()
            .then(() => { alert('Успешно'); refetch(); })
            .catch((error) => alert(JSON.stringify(error.data.message)))
    };

    const handleUpdateImage = async () => {
        await updateImage({ movieID, movieImage: photo }).unwrap()
            .then(() => { alert('Успешно'); refetch(); })
            .catch((error) => alert(JSON.stringify(error.data.message)))
    };
    if (error) {
        return <Alert severity="error">{JSON.stringify(error.data.message)}</Alert>
    }
    return (
        <Box sx={{ width: '90%', margin: 'auto', paddingTop:'30px' }}>
            <Typography variant='h4' sx={{ color: 'gray' }}>Изменение фильма</Typography>
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
                name="genre"
                label="Жанр"
                value={newMovie.genre}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: '7px', marginBottom: '7px' }}
            />
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
            <Button
                variant="contained"
                onClick={handleUpdateMovie}>
                Изменить фильм
            </Button>
            <Typography variant='h6' sx={{ color: 'gray' }}>Обновить фото?</Typography>
            <input
                type="file"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
                accept='image/*'
                id="photo-input"
            />
            <label htmlFor="photo-input">
                <Button variant="contained" component="span">
                    Загрузить фото
                </Button>
            </label>
            <Button
                variant="contained"
                onClick={handleUpdateImage}
                disabled={!photo}
            >
                Изменить фото
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

export default MovieUpdateComponent;
