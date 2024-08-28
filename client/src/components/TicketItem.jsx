import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { reservAPI } from '../services/ReservService';


export default function TicketItem({ ses, refetch }) {
  const [deleteReserv, { }] = reservAPI.useDeleteReservMutation();
  const handleDelete = async () => {
    await deleteReserv({ id: ses.id });
    refetch();
  };
  return (
    <Card variant="outlined" sx={{ bgcolor: '#141414' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Typography sx={{ margin: '5px' }} variant='h5'>
            {ses.session.movie.title}
          </Typography>
          <Typography sx={{ mb: '17px', margin: '5px' }}>
            {ses.session.hall.hallName}
          </Typography>
          <Typography sx={{ mb: '17px', margin: '5px' }}>
            {'Ряд: ' + ses.RowNumber + ' Место: ' + ses.SeatNumber}
          </Typography>
        </div>
        <div>
          <Typography sx={{ mb: '8px' }}>
            {new Date(ses.session.date).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </Typography>
          <Typography >
            {new Date(ses.session.date).toISOString().substr(11, 5)}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <DeleteIcon sx={{ color: 'primary.main', fontSize: '35px' }} onClick={handleDelete} />
      </CardActions>
    </Card>
  );
}