import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../http/axiosBaseQuery'


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://localhost:4242/user' }),
    endpoints: (build) => ({
        fetchAllUsers: build.query({
            query: () => {
                return {
                    url: `/`
                }
            }
        }),
        deleteUser: build.mutation({
            query: (userID) => {
                return {
                    url: `/${userID}`,
                    method: 'DELETE'
                }
            }
        }),

    })
})
