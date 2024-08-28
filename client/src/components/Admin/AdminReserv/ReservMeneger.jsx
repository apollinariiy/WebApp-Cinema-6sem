import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { reservAPI } from '../../../services/ReservService';

const ReservMenegerComponent = () => {
    const { data, error, isLoading, refetch } = reservAPI.useFetchReservQuery();
    const [deleteReserv, { }] = reservAPI.useDeleteReservMutation();

    const handleDelete = async (reservId) => {
             await deleteReserv(reservId);
            refetch();
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', paddingTop: '30px' }}>
            <Typography variant="h4" color={'gray'}>Список бронирований</Typography>
            {data && (data.map((reserv) => (
                <Card key={reserv.id} sx={{ marginBottom: '1rem' }}>
                    <CardContent>
                        <Typography>ID: {reserv.id}</Typography>
                        <Typography>ID сеанса: {reserv.sessionId}</Typography>
                        <Typography>ID пользователя: {reserv.userId}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() => handleDelete(reserv.id)}
                        >
                            Удалить
                        </Button>
                    </CardActions>
                </Card>)
            ))}
        </Box>
    );
};

export default ReservMenegerComponent;
