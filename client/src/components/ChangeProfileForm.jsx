import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Context } from "../index";

function ChangeProfileForm() {
    const { store } = useContext(Context);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        await store.update(data);
    };
    return (
        <Container component="main" maxWidth="100%" sx={{ color: '#FFFFFF' }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        mt: 3
                    }}
                >
                    <Grid container spacing={2} sx={{ color: '#FFFFFF' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                defaultValue={store.user.surname}
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
                                defaultValue={store.user.name}
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
                                defaultValue={store.user.email}
                                {...register('email', {
                                    required: 'Введите данные',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Введите действительный адрес электронной почты',
                                    },
                                })}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                defaultValue={store.user.phone}
                                placeholder="Номер"
                                {...register('phone', {
                                    required: 'Введите данные',
                                    pattern: {
                                        value: /^375\d{9}$/,
                                        message: 'Введите номер в формате 375XXXXXXXXX',
                                    },
                                })}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Изменить
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ChangeProfileForm;
