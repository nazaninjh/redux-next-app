import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./../api/apiSlice";


const usersAdaptor = createEntityAdapter();

const initState = usersAdaptor.getInitialState({});


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: () => '/users',
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    return user;
                })
                return usersAdaptor.setAll(initState, loadedUsers);
            },
            providesTags: (result = [], error, arg) => [
                result ?
                [...result.ids.map((id) => ({ type: 'users', id }))] :
                'users'
            ]
        }),
        getUser: builder.query({
            query: (userId) => {
                return `users/${userId}`
            },
            transformResponse: responseData => {
                
                if (responseData) {
                    return usersAdaptor.addOne(initState, responseData)
                }
               
            },
            transformErrorResponse: (result, meta, arg) => result,
            providesTags: (result = {}, error, arg) => [
                result ?
                [{type: 'users', id:arg}] :
                'users'
            ]
        }),
        addNewUser: builder.mutation({
            query: newUser => ({
                url: '/users',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: (result, error, arg) => [
                result ? [{type: 'users', id: arg.id}] : 'users'
            ]
        }),
    })
})


export const selectUsersResult = apiSlice.endpoints.getAllUsers.select();

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
);
  


export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdaptor.getSelectors(state => selectUsersData(state) ?? initState)





export const { 
    useGetAllUsersQuery,
    useGetUserQuery,
    useAddNewUserMutation,
} = extendedApiSlice