import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { hallAPI } from '../../../services/HallService';
import { NavLink, useHistory } from 'react-router-dom';

const HallMenegerComponent = () => {
    const { data, error, isLoading, refetch } = hallAPI.useFetchAllHallsQuery();
    const [deleteHall, { }] = hallAPI.useDeleteHallMutation();

    const handleDelete = async (hallId) => {
        try {
             await deleteHall(hallId);
            refetch();
        } catch (error) {
            console.error('Error deleting hall:', error);
        }
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', paddingTop:'30px' }}> 
            <Typography variant="h4" color={'gray'}>Список залов</Typography>
            {data && (data.map((hall) => (
                <Card key={hall.id} sx={{ marginBottom: '1rem' }}>
                    <CardContent>
                        <Typography>ID: {hall.id}</Typography>
                        <Typography>Название зала: {hall.hallName}</Typography>
                        <Typography>Количество рядов: {hall.rowsCount}</Typography>
                        <Typography>Количество мест в ряду: {hall.seatsCount}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() => handleDelete(hall.id)}
                        >
                            Удалить
                        </Button>
                        <NavLink to={`/admin/hall/update/${hall.id}`}>
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

export default HallMenegerComponent;
