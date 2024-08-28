import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { hallAPI } from '../../../services/HallService';
import { NavLink, useHistory } from 'react-router-dom';
import { sessionAPI } from '../../../services/SessionService';

const SessionMenegerComponent = () => {
    const { data, error, isLoading, refetch } = sessionAPI.useFetchSessionsQuery();
    const [deleteSession, { }] = sessionAPI.useDeleteSessionMutation();

    const handleDelete = async (sessionId) => {
        await deleteSession(sessionId);
        refetch();
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', paddingTop: '30px' }}>
            <Typography variant="h4" color={'gray'}>Список залов</Typography>
            {data && (data.map((session) => (
                <Card key={session.id} sx={{ marginBottom: '1rem' }}>
                    <CardContent>
                        <Typography>ID: {session.id}</Typography>
                        <Typography>ID фильма: {session.movieId}</Typography>
                        <Typography>ID зала: {session.hallId}</Typography>
                        <Typography>Дата: {session.date}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() => handleDelete(session.id)}
                        >
                            Удалить
                        </Button>
                        <NavLink to={`/admin/session/update/${session.id}`}>
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

export default SessionMenegerComponent;
