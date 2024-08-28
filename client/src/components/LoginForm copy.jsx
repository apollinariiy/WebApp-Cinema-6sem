import React, { useContext, useState } from "react";
import { Context } from "../index";

const LoginForm2 = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);
    const handleLogin = () => {
        store.login(login, password);
    };
    const handleRegistration = () => {
        store.registration(login, password);
    };

    return (
        <div>
            <input
                onChange={e => setLogin(e.target.value)}
                value={login}
                type='text'
                placeholder="login"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder="Пароль"
            />
            <button onClick={handleLogin}>Логин</button>
            <button onClick={handleRegistration}>Регистрация</button>
        </div>
    );
}

export default LoginForm2;
