import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { movieAPI } from "../services/MovieService";
import { reservAPI } from "../services/ReservService";
import { sessionAPI } from "../services/SessionService";
import { hallAPI } from "../services/HallService";
import { userAPI } from "../services/UserService";

const rootReducer = combineReducers({
    [movieAPI.reducerPath]: movieAPI.reducer,
    [sessionAPI.reducerPath]: sessionAPI.reducer,
    [reservAPI.reducerPath]: reservAPI.reducer,
    [hallAPI.reducerPath]: hallAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(movieAPI.middleware, sessionAPI.middleware, reservAPI.middleware, hallAPI.middleware, userAPI.middleware)
    })
}
