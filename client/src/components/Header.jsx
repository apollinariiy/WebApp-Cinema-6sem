import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Context } from "../index"
import { Button } from '@mui/material';
import { NavLink, Navigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';


const Header = () => {
    const { store } = useContext(Context);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isRedirect, setIsRedirect] = React.useState(false);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        store.logout();
    };
    const handleProfile = () => {
        setIsRedirect(true);
    };
    if (isRedirect) {
        return <Navigate to="/profile" />;
    }
    const StyledNavLink = (props) => (
        <NavLink {...props} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'inherit' }} />
    );
    return (
        <AppBar position="static" sx={{ backgroundColor: 'black', marginBottom: '20px', borderRadius: '7px' }} >
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontSize: '28px' }}>
                    PLKINO
                </Typography>
                {store.user.role === 'ADMIN' && (
                    <FormControl sx={{ width: '130px', marginRight: '10px' }}>
                        <InputLabel>Настройки</InputLabel>
                        <Select>
                            <ListSubheader>Фильмы</ListSubheader>
                            <StyledNavLink to="/admin/movie/create"><MenuItem>Создать</MenuItem></StyledNavLink>
                            <StyledNavLink to="/admin/movie"><MenuItem>Изменить</MenuItem></StyledNavLink>
                            <StyledNavLink to="/admin/movie"><MenuItem>Удалить</MenuItem></StyledNavLink>
                            <ListSubheader>Залы</ListSubheader>
                            <StyledNavLink to="/admin/hall/create"><MenuItem>Создать</MenuItem></StyledNavLink>
                            <StyledNavLink to="/admin/hall/"><MenuItem>Изменить</MenuItem></StyledNavLink>
                            <StyledNavLink to="/admin/hall/"><MenuItem>Удалить</MenuItem></StyledNavLink>
                            <ListSubheader>Сеансы</ListSubheader>
                            <StyledNavLink to="/admin/session/create"><MenuItem>Создать</MenuItem></StyledNavLink>
                            <StyledNavLink to="/admin/session/"><MenuItem>Изменить</MenuItem></StyledNavLink>
                            <StyledNavLink to="/admin/session/"><MenuItem>Удалить</MenuItem></StyledNavLink>
                            <ListSubheader>Пользователи</ListSubheader>
                            <StyledNavLink to="/admin/user"><MenuItem>Удалить</MenuItem></StyledNavLink>
                            <ListSubheader>Бронирования</ListSubheader>
                            <StyledNavLink to="/admin/reserv"><MenuItem>Удалить</MenuItem></StyledNavLink>
                        </Select>
                    </FormControl>
                )}

                {store.user.name ? (
                    <>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}
                            onMouseEnter={handleMenuOpen}
                            onMouseLeave={handleMenuClose}
                        >
                            <Typography variant="subtitle1" sx={{ mr: 1, fontSize: '20px' }}>
                                {store.user.name}
                            </Typography>
                            <Avatar sx={{ bgcolor: 'primary.main', width: '50px', height: '50px' }}>
                                {store.user.name.substring(0, 2).toUpperCase()}
                            </Avatar>
                            {store.user.role && (
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        style: {
                                            backgroundColor: 'black'
                                        },
                                    }}>
                                    {store.user.role === 'USER' && (<StyledNavLink to="/profile">
                                        <MenuItem >Профиль</MenuItem>
                                    </StyledNavLink>)}

                                    <MenuItem onClick={handleLogout} >Выйти</MenuItem>
                                </Menu>)}
                        </Box>
                    </>
                ) : (
                    <><StyledNavLink to="/singin">
                        <Typography variant="subtitle1" sx={{ color: 'gray' }}> ВОЙТИ</Typography></StyledNavLink>
                        <Avatar sx={{ bgcolor: 'primary.main', marginLeft: '8px' }}>?</Avatar>
                    </>
                )}


            </Toolbar>
        </AppBar>
    );
};

export default Header;
