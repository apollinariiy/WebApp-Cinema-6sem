import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import { User } from "../models/IUser";
import UserService from "../services/UserService";
import { useState } from "react";
import { createSocket, disconnectSocket } from "../http/socketMeneger";


export default class Store {
    constructor() {
        this.user = {};
        this.isAuth = false;
        this.reserv = null;
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
        createSocket();
    }

    setReserv(reserv){
    this.reserv = reserv;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e) {
            console.log(e);
            return e
        }
    }

    async update(data) {
        try {
            const response = await AuthService.update(data);
            this.setUser(response.data.user);
        }
        catch (e) {
            console.log(e);
        }
    }


    async registration(data) {
        try {
            const response = await AuthService.registration(data);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
            disconnectSocket()
        }
        catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e) {
            console.log(e);
        }
    }
}
