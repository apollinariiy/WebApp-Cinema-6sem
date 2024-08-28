import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { Avatar, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Context } from "../index";
import { useContext } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { reservAPI } from '../services/ReservService';
import TicketItem from './TicketItem';
import ChangeProfileForm from './ChangeProfileForm';


export default function ProfilePage() {
    const { store } = useContext(Context);
    const [value, setValue] = React.useState(0);
    const [createReserv, { }] = reservAPI.useCreateReservMutation()
    const { data, error, isLoading, refetch } = reservAPI.useFetchReservByUserQuery(store.user.id);
    const renderContent = () => {
        switch (value) {
            case 0:
                return <Box sx={{ width: '100%' }}><Grid container spacing={1}>
                    {data && data.map(reserv =>
                        <Grid item xs={3} sm={5} md={6} key={reserv.id}>
                            <TicketItem ses={reserv} refetch={refetch} />
                        </Grid>
                    )}
                </Grid></Box>
            case 1:
                return <ChangeProfileForm></ChangeProfileForm>
            default:
                return null;
        }
    };
    return (
        <Grid container spacing={1} alignItems="center" rowSpacing={4} sx={{ width: '70%', margin: 'auto' }}>
            <Grid item xs={6} sm={3}>
                <Avatar sx={{ width: '200px', height: '200px', bgcolor: '#141414' }}>
                    <PersonOutlineIcon sx={{ width: '100px', height: '100px', color: '#666666' }} />
                </Avatar>
            </Grid>
            <Grid item sm={9} xs={3} >
                <Box>
                    <Typography component="h1" variant="h3" sx={{  textAlign: 'center' }}>
                        {store.user.name + ' ' + store.user.surname}
                    </Typography>

                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        sx={{ bgcolor: '#000000', margin: '20px' }}>
                        <BottomNavigationAction
                            label="Билеты"
                            sx={{
                                color: value === 0 ? '#ffffff' : '#666666',
                                position: 'relative',
                                '&.Mui-selected::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: -2,
                                    width: '100%',
                                    borderBottom: '4px solid #6a1b9a',
                                },
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '24px',
                                }
                            }}
                        />
                        <BottomNavigationAction
                            label="Профиль"
                            sx={{
                                color: value === 1 ? '#ffffff' : '#666666',
                                position: 'relative',
                                '&.Mui-selected::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: -2,
                                    width: '100%',
                                    borderBottom: '4px solid #6a1b9a',
                                },
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '24px',
                                },
                            }}
                        />
                    </BottomNavigation>
                </Box>
            </Grid>
            <Grid item xs={6} sm={12} sx={{ height: '300px' }}>
                {renderContent()}
            </Grid>

        </Grid >
    );
}
