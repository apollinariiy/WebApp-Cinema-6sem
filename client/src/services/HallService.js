import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../http/axiosBaseQuery'


export const hallAPI = createApi({
    reducerPath: 'hallAPI',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://localhost:4242/hall' }),
    endpoints: (build) => ({
        fetchAllHalls: build.query({
            query: () => {
                return {
                    url: `/`
                }
            }
        }),
        fetchHallByID: build.query({
            query: (hallID) => {
                return {
                    url: `/${hallID}`
                }
            }
        }),
        createHall: build.mutation({
            query: (data) => {
                return {
                    url: `/`,
                    method: 'POST',
                    data: data
                }
            }
        }),
        updateHall: build.mutation({
            query: (data) => {
                const { hallID, hallData } = data
                return {
                    url: `/${hallID}`,
                    method: 'PUT',
                    data: hallData
                }
            }
        }),
        deleteHall: build.mutation({
            query: (hallID) => {
                return {
                    url: `/${hallID}`,
                    method: 'DELETE'
                }
            }
        }),
    })
})
