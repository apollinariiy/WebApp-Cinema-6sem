import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Context } from "../index";
import { useContext, useState } from 'react';
import { Alert, Avatar, Container } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginForm = () => {
    const { store } = useContext(Context);
    const [isError, setIsError] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const error = await store.login(data.email, data.password);
        if (error) {
            setIsError(JSON.stringify(error.response.data.message));
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ color: '#FFFFFF' }}>
            {isError && <Alert severity="error">{isError}</Alert>}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
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
                    Вход
                </Typography>
                <Box
                    sx={{
                        mt: 3
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Email"
                        {...register('email', {
                            required: 'Заполните поле',
                        })}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        type="password"
                        placeholder="Пароль"
                        {...register('password', {
                            required: 'Заполните поле',
                        })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        margin="normal"
                        sx={{ mt: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Войти
                    </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Box mt={1}>
                            <Link href="/singup" variant="body2">
                                Нет аккаунта? Зарегистрируйтесь
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;