import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ChairIcon from '@mui/icons-material/Chair';
import { reservAPI } from '../services/ReservService';
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, MenuItem } from '@mui/material';
import { Context } from '../index';
import { loadStripe } from '@stripe/stripe-js';
import $api from '../http';

const SeatsContainer = () => {
    const { sessionID } = useParams();
    const { data, error, isLoading, refetch } = reservAPI.useFetchAllReservQuery(sessionID);

    const [makePayment, { }] = reservAPI.usePayReservMutation()
    const [selectedIcons, setSelectedIcons] = useState([]);
    const handleIconClick = (index) => {
        if (selectedIcons.includes(index)) {
            setSelectedIcons(selectedIcons.filter((i) => i !== index));
        } else {
            setSelectedIcons([...selectedIcons, index]);
        }
    };
    const { store } = useContext(Context);
    const handleCreate = async () => {
        const reservations = selectedIcons.map((seatNumber) => ({
            sessionId: sessionID,
            RowNumber: calculateRowNumber(seatNumber),
            SeatNumber: calculateSeatNumber(seatNumber),
            userId: store.user.id

        }));
        const dataPay = selectedIcons.map((seatNumber) => ({
            price: data.session.hall.price,
            title: data.session.movie.title,
            image: data.session.movie.image,

        }));
        await handlePayment(dataPay, reservations)
    };

    const handlePayment = async (dataPay, reservations) => {
        await makePayment({ dataPay, reservations }).unwrap()
            .then(async (payload) => {
                const stripe = await loadStripe("pk_test_51PETreP2SvudJLXShBDQ9hz4tBRsSGgwkmsuA3RAwiA7xrV1aXvfsegHe5WUbj7Ok58jTBvROX8no83FozMZ0rU800tAKOCva5");
                stripe.redirectToCheckout({
                    sessionId: payload.id
                })
            })
            .catch((error) => alert(JSON.stringify(error.data.message)));;

    }

    const calculateRowNumber = (seatNumber) => Math.floor((seatNumber - 1) / data.session.hall.seatsCount) + 1;
    const calculateSeatNumber = (seatNumber) => (seatNumber - 1) % data.session.hall.seatsCount + 1;
    if (error) {
        return <Alert severity="error">{JSON.stringify(error.data.message)}</Alert>
    }
    if (data) {

        return (
            <Box>
                <Grid container spacing={1}>
                    {[...Array(data.session.hall.rowsCount)].map((_, rowIndex) => (
                        <Grid container item xs={12} key={rowIndex}>
                            {[...Array(data.session.hall.seatsCount)].map((_, columnIndex) => {
                                const seatNumber = rowIndex === 0 ? columnIndex + 1 : rowIndex * data.session.hall.seatsCount + columnIndex + 1;
                                const isSeatOccupied = data.reserv.some(reservation =>
                                    reservation.SeatNumber === columnIndex + 1 && reservation.RowNumber === rowIndex + 1
                                );

                                const isSelected = selectedIcons.includes(seatNumber);
                                const isDisabled = isSeatOccupied;

                                return (
                                    <Grid item xs={1} key={columnIndex} sx={{ margin: 'auto' }}>
                                        <Tooltip title={`Ряд:${rowIndex + 1} Место:${columnIndex + 1} Цена:${data.session.hall.price}BYN`}>
                                            <IconButton
                                                disabled={isDisabled}
                                                onClick={() => handleIconClick(seatNumber)}
                                            >
                                                <ChairIcon
                                                    fontSize='small'
                                                    sx={{
                                                        color: isDisabled ? 'grey' : (isSelected ? 'primary.main' : '#FFFFFF'),
                                                        fontSize: 50
                                                    }}
                                                >
                                                </ChairIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent="center" sx={{ margin: '20px' }}>
                    {store.isAuth ? (
                        store.user.role === 'USER' ? (
                            <Button
                                variant="outlined"
                                onClick={handleCreate}
                                sx={{ width: '300px', height: '60px', fontWeight: 'bold', borderWidth: '4px', fontSize: '20px' }}
                            >
                                КУПИТЬ БИЛЕТ
                            </Button>
                        ) : (<></>)
                    ) : (
                        <Button
                            variant="outlined"
                            href='/singin'
                            sx={{ width: '300px', height: '60px', fontWeight: 'bold', borderWidth: '4px', fontSize: '20px' }}
                        >
                            АВТОРИЗОВАТЬСЯ
                        </Button>
                    )}
                </Grid>
            </Box>

        );

    }
};

export default SeatsContainer;
