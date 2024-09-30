import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
export const communityApi = createApi({
  reducerPath: 'communityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('x-auth-token', token);
      }
      return headers;
    }

  }),
  endpoints: (build) => ({
    GetAllCommunity: build.query({
      query: (filter) => {
        const params=new URLSearchParams(filter).toString()
       return  { url: `community/allCommunity?${params}` }
      },
      transformResponse: (response) => response.data
    }),
    CreateCommunity: build.mutation({
      query: (credentials) => ({ url: `community/createCommunity`, method: 'POST', body: credentials }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message
        }
      }
    }),
    UpdateCommunity: build.mutation({
      query: ({ id, body }) => ({ url: `/community/communityUpdate/${id}`, method: 'PUT', body: body }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message

        }
      }
    }),
    DeleteCommunity: build.mutation({
      query: (id) => ({ url: `/community/communityDelete/${id} `, method: 'DELETE' }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message
        }
      }
    }),


  }),
});

export const { 
 useGetAllCommunityQuery,
 useCreateCommunityMutation,
 useDeleteCommunityMutation,
 useUpdateCommunityMutation
} = communityApi;

