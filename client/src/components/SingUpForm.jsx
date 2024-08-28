import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { Context } from "../index";
import { useContext } from 'react';
import { NavLink, Navigate, redirect } from "react-router-dom"; import { Alert } from "@mui/material";
;


export default function SignUp() {
    const { store } = useContext(Context);
    const [isError, setIsError] = React.useState();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const { surname, name, email, phone, password } = data;
        const error = await store.registration({ surname, name, email, phone, password });
        if (error) {
            setIsError(JSON.stringify(error.response.data.message));
        }
    };
    return (
        <Container component="main" maxWidth="xs" sx={{ color: '#FFFFFF' }}>
            {isError && <Alert severity="error">{isError}</Alert>}
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                placeholder="Фамилия"
                                {...register('surname', {
                                    required: 'Введите данные',
                                    minLength: {
                                        value: 3,
                                        message: 'больше 3 символов',
                                    },
                                })}
                                error={Boolean(errors.surname)}
                                helperText={errors.surname?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                placeholder="Имя"
                                {...register('name', {
                                    required: 'Введите данные',
                                    minLength: {
                                        value: 3,
                                        message: 'больше 3 символов',
                                    },
                                })}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                placeholder="Email"
                                {...register('email', {
                                    required: 'Введите данные',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Введите действительный адрес электронной почты',
                                    },
                                })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                placeholder="Номер"
                                {...register('phone', {
                                    required: 'Введите данные',
                                    pattern: {
                                        value: /^375\d{9}$/,
                                        message: 'Введите номер в формате 375XXXXXXXXX',
                                    },
                                })}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                placeholder="Пароль"
                                type="password"
                                {...register('password', {
                                    required: 'Введите данные',
                                    minLength: {
                                        value: 6,
                                        message: 'больше 6 символов',
                                    },
                                })}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/singin" variant="body2">
                                Уже есть аккаунт? Войдите
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}