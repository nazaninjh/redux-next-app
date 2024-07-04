import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./../api/apiSlice";


const blogAdaptor = createEntityAdapter({

});

const initState = blogAdaptor.getInitialState({});


const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllBlogs: builder.query({
            query: () => '/blogs',
            transformResponse: responseData => {
                const loadedBlogs = responseData.map(blog => {
                    return blog;
                });
                return blogAdaptor.setAll(initState, loadedBlogs);
            },
            providesTags: (result = [], error, arg) => [
                result ?
                [...result.ids.map((id) => ({ type: 'blogs', id }))] :
                'blogs'
            ]
            
        }),
        getBlog: builder.query({
            query: (blogId) => {
                return `blogs/${blogId}`
            },
            transformResponse: responseData => {
                
                if (responseData) {
                    return blogAdaptor.addOne(initState, responseData)
                }
               
            },
            transformErrorResponse: (result, meta, arg) => result,
            providesTags: (result = {}, error, arg) => [
                result ?
                [{type: 'blogs', id:arg}] :
                'blogs'
            ]
        }),
        addBlog: builder.mutation({
            
            query: newBlog => ({
                url: '/blogs',
                method: 'POST',
                body: newBlog
            }),
            invalidatesTags: (result, error, arg) => [
                result ? [{type: 'blogs', id: arg.id}] : 'blogs'
            ]
        
        }),
        editBlog: builder.mutation({
            query: (updatedBlog) => ({
                url: `/blogs/${updatedBlog.id}`,
                method: 'PUT',
                body: updatedBlog
            }),
            invalidatesTags: (result, error, arg) => [
                result ? [{type: 'blogs', id: arg.id}] : 'blogs'
            ]
        
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                result ? [{type: 'blogs', id: arg}] : 'blogs'
            ]
        })
      
    }),
    
});

export const selectBlogsResult = extendedApiSlice.endpoints.getAllBlogs.select();


const selectBlogsData = createSelector(
    selectBlogsResult,
    blogsResult => blogsResult.data
)

export const {
    selectAll: selectAllBlogs,
    selectById: selectBlogById,
    selectIds: selectBlogsIds
} = blogAdaptor.getSelectors(state => selectBlogsData(state) ?? initState);



export const {
    useGetAllBlogsQuery,
    useGetBlogQuery,
    useAddBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation
} = extendedApiSlice