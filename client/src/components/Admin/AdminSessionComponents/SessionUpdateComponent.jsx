import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { sessionAPI } from '../../../services/SessionService';
import { hallAPI } from '../../../services/HallService';
import { movieAPI } from '../../../services/MovieService';
import { useParams } from 'react-router-dom';

const SessionUpdateComponent = () => {
    const { sessionID } = useParams();
    const { data, error, isLoading, refetch } = sessionAPI.useFetchSessionByIDQuery(sessionID);
    const { data: hallsData, error: hallsError, isLoading: hallsLoading, refetch: refetchHalls } = hallAPI.useFetchAllHallsQuery();
    const { data: moviesData, error: moviesError, isLoading: moviesLoading, refetch: refetchMovies } = movieAPI.useFetchAllMoviesQuery();
    const [updateSession, { }] = sessionAPI.useUpdateSessionMutation()
    const [sessionData, setSessionData] = useState({
        date: '',
        movieId: '',
        hallId: ''
    });

    useEffect(() => {
        if (data) {
            const session = data[0];
            const dateObject = new Date(session.date);
            const formattedDate = dateObject.toISOString().slice(0, 16);
            setSessionData({
                ...sessionData,
                date: formattedDate,
                movieId: session.movieId,
                hallId: session.hallId
            });
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSessionData({ ...sessionData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateSession({ sessionID, sessionData })
            .unwrap()
            .then(() => { alert('Успешно'); refetch() })
            .catch((error) => alert(JSON.stringify(error.data.message)));
    };
    if (error) {
        return <Alert severity="error">{JSON.stringify(error.data.message)}</Alert>
    }
    return (
        <form onSubmit={handleUpdate}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '90%', margin: 'auto', paddingTop: '30px' }}>
                <Typography variant='h4' sx={{ color: 'gray' }}>Обновление сеанса</Typography>
                <TextField
                    name="date"
                    placeholder="Дата и время"
                    type="datetime-local"
                    value={sessionData.date}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    select
                    name="movieId"
                    label="Выберите фильм"
                    value={sessionData.movieId}
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
                    value={sessionData.hallId}
                    onChange={handleInputChange}
                    fullWidth>
                    {hallsData && hallsData.map(hall => (
                        <MenuItem key={hall.id} value={hall.id}>
                            {hall.hallName}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained">Обновить сеанс</Button>
            </Box>
        </form>
    );
};

export default SessionUpdateComponent;
