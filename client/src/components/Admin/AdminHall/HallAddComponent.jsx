import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { hallAPI } from '../../../services/HallService';

const HallAddComponent = () => {
    const [createHall, { }] = hallAPI.useCreateHallMutation();
    const [newHall, setNewHall] = useState({
        hallName: '',
        rowsCount: '',
        seatsCount: '',
        price: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHall({ ...newHall, [name]: value });
    };

    const handleCreate = async () => {
            await createHall(newHall)
            .unwrap()
            .then(() => {alert('Успешно'); window.location.reload()})
            .catch((error) => alert(JSON.stringify(error.data.message)));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '90%', margin: 'auto', paddingTop:'30px'  }}>
            <Typography variant='h4' sx={{ color: 'gray' }}>Добавление зала</Typography>
            <TextField
                name="hallName"
                label="Название зала"
                value={newHall.hallName}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                name="rowsCount"
                label="Количество рядов"
                type="number"
                value={newHall.rowsCount}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                name="seatsCount"
                label="Количество мест в ряду"
                type="number"
                value={newHall.seatsCount}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                name="price"
                label="Цена за место"
                type="number"
                value={newHall.price}
                onChange={handleInputChange}
                fullWidth
            />
            <Button onClick={handleCreate} variant="contained">Добавить зал</Button>
        </Box>
    
    );
};

export default HallAddComponent;
