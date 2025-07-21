import { API_URL } from "@/constants/Query.api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const randomQuoteApi = createApi({
  reducerPath: "randomQuoteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    timeout: 10000,
  }),
  tagTypes: ["Quotes"],
  endpoints: (builder) => ({
    getRandomQuote: builder.query({
      query: () => "/",
      providesTags: ["Quotes"],
    }),
  }),
});

export const { useGetRandomQuoteQuery } = randomQuoteApi;
