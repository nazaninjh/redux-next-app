import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { extendedApiSlice } from "./features/users/usersSlice";
// return a new store per request

export const makeStore = () => {
    return configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(apiSlice.middleware)
    })
}