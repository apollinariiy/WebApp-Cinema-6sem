import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../http/axiosBaseQuery'


export const reservAPI = createApi({
    reducerPath: 'reservAPI',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://localhost:4242/reservation', }),
    endpoints: (build) => ({
        fetchAllReserv: build.query({
            query: (sessionID) => {
                return {
                    url: `/${sessionID}`
                }
            }
        }),
        fetchReserv: build.query({
            query: () => {
                return {
                    url: `/`
                }
            }
        }),
        fetchReservByUser: build.query({
            query: () => {
                return {
                    url: `/user`
                }
            }
        }),
        createReserv: build.mutation({
            query: (reserv) => ({
                url: `/create`,
                method: 'POST',
                data: reserv
            })
        }),
        payReserv: build.mutation({
            query: (reserv) => ({
                url: `/pay`,
                method: 'POST',
                data: reserv
            })
        }),
        deleteReserv: build.mutation({
            query: (id) => ({
                url: `/delete`,
                method: 'DELETE',
                data: id
            })
        })
    })
})
