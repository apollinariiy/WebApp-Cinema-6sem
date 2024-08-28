import React, { useEffect, useState } from 'react';
import { sessionAPI } from "../services/SessionService";
import SessionItem from './SessionItem';
import Grid from '@mui/material/Unstable_Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { Alert } from '@mui/material';
import { useParams } from 'react-router-dom';


const SessionsContainer = ({ date }) => {
    const { movieID } = useParams();
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const { data, error, isLoading, refetch } = sessionAPI.useFetchAllSessionsQuery({ movieID: movieID, date: formattedDate });
    if (error) {
        return <Alert severity="error">{JSON.stringify(error.data.message)}</Alert>
    }

    return (
        <Box sx={{ flexGrow: 1, margin: 'auto', width: '90%', paddingTop: '30px' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {data && data.length > 0 ? (
                    data.map(ses =>
                        <Grid xs={2} sm={4} md={4} key={ses.id}>
                            <SessionItem ses={ses}></SessionItem>
                        </Grid>
                    )
                ) : (
                    <Alert severity="info" sx={{ width: '100%' }}>Сеансы на данную дату не запланированы :(</Alert>
                )}
            </Grid>
        </Box>
    );
};

export default SessionsContainer;
