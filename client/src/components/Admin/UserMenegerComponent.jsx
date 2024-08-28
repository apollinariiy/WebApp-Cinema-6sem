import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { userAPI } from '../../services/UserService';

const UserMenegerComponent = () => {
    const { data: usersData, error, isLoading, refetch } = userAPI.useFetchAllUsersQuery();
    const [deleteUser, { }] = userAPI.useDeleteUserMutation();

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            refetch();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    return (
        <Box sx={{ width: '90%', margin: 'auto', paddingTop: '30px' }}>
            <Typography variant="h4" sx={{ color: 'gray' }}>Список пользователей</Typography>
            {usersData && (
                usersData.map((user) => (
                        <Card key={user.id} sx={{ marginBottom: '1rem' }}>
                            <CardContent>
                                <Box>
                                    <Typography variant='h6' sx={{ marginRight: '10px' }}>ID: {user.id}  </Typography>
                                    <Typography variant='h6' sx={{ marginRight: '10px' }}>Email: {user.email}</Typography>
                                    <Typography variant='h6' sx={{ marginRight: '10px' }}>Роль: {user.role}</Typography>
                                </Box>
                                <Button
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(user.id)}>
                                    Удалить
                                </Button>
                            </CardContent>
                        </Card>
                ))
            )}
        </Box>
    );
};

export default UserMenegerComponent;
