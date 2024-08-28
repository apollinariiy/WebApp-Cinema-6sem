import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MovieIcon from '@mui/icons-material/Movie';
import { movieAPI } from '../services/MovieService';
import { NavLink, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Alert from '@mui/material/Alert';

export default function FullMovieItem() {
    const { movieID } = useParams();
    const { data, error, isError, isLoading, refetch } = movieAPI.useFetchMoviesByIdQuery(movieID);
    if (error) {
        return <Alert severity="error">{JSON.stringify(error.data.message)}</Alert>
    }
    if (data) {
        return (
            <Grid container spacing={1} alignItems="center" rowSpacing={4} sx={{ flexGrow: 1, paddingTop: '30px', width: '90%', margin: 'auto' }}>
                <Grid sm={6}>
                    <Card sx={{ width: '100%', height: '550px', position: 'relative', borderRadius: '10px', backgroundImage: `url(${data[0].image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

                    </Card>
                </Grid>
                <Grid sm={6} sx={{ padding: '30px', color: 'white' }}>

                    <Typography variant="h2" sx={{ fontFamily: "Nunito" }}>{data[0].title}</Typography>
                    <Typography variant="h4" sx={{ border: '4px solid gray', padding: '5px', borderRadius: '8px', width: '55px' }}>
                        {data[0].ageLimit + '+'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'gray', marginTop: '30px' }}>
                        <MovieIcon sx={{ fontSize: '30px', marginRight: '5px' }} />
                        <Typography variant="h5">{data[0].genre}</Typography>
                        <AccessTimeIcon sx={{ fontSize: '30px', marginRight: '5px', marginLeft: '20px' }} />
                        <Typography variant="h5">
                            {Math.floor(data[0].duration / 60)} ч {data[0].duration % 60} мин
                        </Typography>
                    </Box>
                    <Box sx={{ color: 'gray', marginTop: '30px' }}>
                        <Typography variant="h6">Описание:</Typography>
                        <Typography>{data[0].description}</Typography>
                    </Box>
                    <NavLink to={`/buy/${data[0].id}`}>
                        <Button
                            variant='outlined'
                            size="large"
                            sx={{
                                borderRadius: '5px',
                                border: '3px solid',
                                marginTop: 5,
                                '&:hover': {
                                    border: '3px solid white',
                                    color: 'white'
                                },
                            }}
                        >
                            Купить билет
                        </Button></NavLink>
                </Grid>
            </Grid>
        );
    }
}