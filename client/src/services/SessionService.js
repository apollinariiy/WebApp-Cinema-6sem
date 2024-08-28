import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../http/axiosBaseQuery'


export const sessionAPI = createApi({
    reducerPath: 'sessionAPI',
    baseQuery: axiosBaseQuery({baseUrl: 'https://localhost:4242/session'}),
    endpoints: (build) => ({
        fetchAllSessions: build.query({
            query: (args) => {
                const { movieID, date } = args;
                return {
                url: `/session/${movieID}/${date}`}
            }
        }),
        fetchSessions: build.query({
            query: () => {
                return {
                url: `/`}
            }
        }),
        fetchSessionByID: build.query({
            query: (sessionID) => {
                return {
                url: `/${sessionID}`}
            }
        }),
        createSession: build.mutation({
            query: (data) => ({
                url: `/create`,
                method: 'POST',
                data: data
            })
        }),
        updateSession: build.mutation({
            query: (data) => {
                const {sessionID, sessionData} = data;
                return {
                url: `/${sessionID}`,
                method: 'PUT',
                data: sessionData
            }}
        }),
        deleteSession: build.mutation({
            query: (sessionID) => ({
                url: `/${sessionID}`,
                method: 'DELETE'
            })
        }),
        
    })
})
