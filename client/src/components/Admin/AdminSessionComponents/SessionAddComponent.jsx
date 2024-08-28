import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { hallAPI } from '../../../services/HallService';
import { movieAPI } from '../../../services/MovieService';
import { sessionAPI } from '../../../services/SessionService';

const SessionAddComponent = () => {
    const { data: hallsData, error: hallsError, isLoading: hallsLoading, refetch: refetchHalls } = hallAPI.useFetchAllHallsQuery();
    const { data: moviesData, error: moviesError, isLoading: moviesLoading, refetch: refetchMovies } = movieAPI.useFetchAllMoviesQuery();
    const [createSession, { }] = sessionAPI.useCreateSessionMutation()
    const [newSession, setNewSession] = useState({
        date: '',
        movieId: '',
        hallId: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSession({ ...newSession, [name]: value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await createSession(newSession)
            .unwrap()
            .then(() => { alert('Успешно'); window.location.reload(); })
            .catch((error) => alert(JSON.stringify(error.data.message)));
    };

    return (
        <form onSubmit={handleCreate}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '90%', margin: 'auto', paddingTop: '30px' }}>
                <Typography variant='h4' sx={{ color: 'gray' }}>Добавление сеанса</Typography>
                <TextField
                    name="date"
                    placeholder="Дата и время"
                    type="datetime-local"
                    value={newSession.date}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    select
                    name="movieId"
                    label="Выберите фильм"
                    value={newSession.movieId}
                    onChange={handleInputChange}
                    fullWidth
                >
                    {moviesData && moviesData.map(movie => (
                        <MenuItem key={movie.id} value={movie.id}>
                            {movie.title}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    name="hallId"
                    label="Выберите зал"
                    value={newSession.hallId}
                    onChange={handleInputChange}
                    fullWidth>
                    {hallsData && hallsData.map(hall => (
                        <MenuItem key={hall.id} value={hall.id}>
                            {hall.hallName}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained">Создать сеанс</Button>
            </Box>
        </form>
    );
};

export default SessionAddComponent;
