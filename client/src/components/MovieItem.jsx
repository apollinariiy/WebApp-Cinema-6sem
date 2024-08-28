import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import { ArrowForward } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { Context } from "../index"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { movieAPI } from '../services/MovieService';


const BlurredBackground = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    opacity: 0,
    transition: 'opacity 0.3s ease',
});

const ActionButtons = styled(CardActions)({
    position: 'absolute',
    bottom: 8,
    left: '50%',
    transform: 'translateX(-50%)',
});

export default function MovieItem({ movie }) {
    const imagePath = `./images/${movie.image}`;
    const { store } = React.useContext(Context);
    const [hovered, setHovered] = React.useState(false);

    const [deleteMovie, { }] = movieAPI.useDeleteMovieMutation();
    const handleDelete = async () => {
        await deleteMovie(movie.id);
        window.location.reload();
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };



    return (
        <Card sx={{ height: '400px', position: 'relative', borderRadius: '4px', backgroundImage: `url(${movie.image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <Card sx={{
                width: '100%,', '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // полупрозрачный черный цвет
                    borderRadius: '4px',
                }
            }}></Card>
            <CardActionArea
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    height: '100%',
                    padding: '16px'
                }}>
                <Typography variant="h3" sx={{ textAlign: 'left', marginBottom: '5' }}>{movie.title}</Typography>
            </CardActionArea>
            {hovered && (
                <BlurredBackground
                    style={{ opacity: 1 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '30px' }}>{movie.title}</Typography>
                    {store.user.role == 'ADMIN' && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NavLink to={"/admin/movie/create"}>
                                <AddCircleIcon sx={{ marginRight: 2, color: 'primary.main', fontSize: '30px' }} /></NavLink>
                            <NavLink to={`/admin/movie/update/${movie.id}`}>
                                <EditIcon sx={{ marginRight: 2, color: 'primary.main', fontSize: '30px' }} /></NavLink>

                            <DeleteIcon sx={{ color: 'primary.main', fontSize: '30px' }} onClick={handleDelete} />
                        </Box>
                    )}
                    <NavLink to={`/buy/${movie.id}`}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                margin: 2,
                            }}>
                            Купить билет
                        </Button></NavLink>
                    <NavLink to={`/movie/${movie.id}`}>
                        <Button
                            variant="outlined"
                            size="large"
                            style={{
                                borderWidth: '4px',
                                color: 'white'
                            }}
                            endIcon={<ArrowForward />}                        >
                            Подробнее
                        </Button></NavLink>
                </BlurredBackground>
            )}
        </Card>
    );
}
