import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Context } from "../index"
import { sessionAPI } from '../services/SessionService';


export default function SessionItem({ ses }) {
  const { store } = React.useContext(Context);
  const [deleteSession, { }] = sessionAPI.useDeleteSessionMutation();
  const handleDelete = async () => {
    await deleteSession(ses.id);
    window.location.reload();
  };
  return (
    <Card variant="outlined" sx={{ bgcolor: '#141414', borderRadius: '4px' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Typography sx={{ margin: '5px' }} variant='h5'>
            {ses.movie.title}
          </Typography>
          <Typography sx={{ mb: '17px', margin: '5px' }}>
            {ses.hall.hallName}
          </Typography>
        </div>
        <Typography sx={{ mb: '17px', marginRight: '20px' }}>
          {new Date(ses.date).toISOString().substr(11, 5)}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <NavLink to={`/seats/${ses.id}`}>
          <Button size="small">Выбрать место</Button>
        </NavLink>
        {store.user.role === 'ADMIN' && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to={"/admin/session/create"}>
              <AddCircleIcon sx={{ marginRight: 2, color: 'primary.main', fontSize: '30px' }} />
            </NavLink>
            <NavLink to={`/admin/session/update/${ses.id}`}>
              <EditIcon sx={{ marginRight: 2, color: 'primary.main', fontSize: '30px' }} />
            </NavLink>
            <DeleteIcon sx={{ color: 'primary.main', fontSize: '30px' }} onClick={handleDelete} />
          </Box>
        )}
      </CardActions>

    </Card>

  );
}