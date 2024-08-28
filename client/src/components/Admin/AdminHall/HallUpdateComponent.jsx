import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { hallAPI } from '../../../services/HallService';

const HallUpdateComponent = () => {
    const { hallID } = useParams();
    const { data, error, isLoading, refetch } = hallAPI.useFetchHallByIDQuery(hallID);
    const [updateHall, { }] = hallAPI.useUpdateHallMutation();
    const [hallData, setHallData] = useState({
        hallName: '',
        rowsCount: 0,
        seatsCount: 0,
        price: 0
    });

    useEffect(() => {
        if (data) {
            const hall = data[0];
            setHallData({
                hallName: hall.hallName,
                rowsCount: hall.rowsCount,
                seatsCount: hall.seatsCount,
                price: hall.price
            });
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHallData({ ...hallData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateHall({ hallID, hallData })
            .unwrap()
            .then(() => { alert('Успешно'); })
            .catch((error) => alert(JSON.stringify(error.data.message)));
    };
    if (error) {
        return <Alert severity="error">{JSON.stringify(error.data.message)}</Alert>
    }
    return (
        <form onSubmit={handleUpdate}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '90%', margin: 'auto', paddingTop: '30px' }}>
                <Typography variant='h4' color={'gray'}>Изменение зала</Typography>
                <TextField
                    name="hallName"
                    label="Название зала"
                    value={hallData.hallName}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="rowsCount"
                    label="Количество рядов"
                    type="number"
                    value={hallData.rowsCount}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="seatsCount"
                    label="Количество мест в ряду"
                    type="number"
                    value={hallData.seatsCount}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="price"
                    label="Цена за место"
                    type="number"
                    value={hallData.price}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Button type="submit" variant="contained">Сохранить изменения</Button>
            </Box>
        </form>
    );
};

export default HallUpdateComponent;
