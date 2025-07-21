import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const randomQuoteApi = createApi({
  reducerPath: "randomQuoteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realinspire.live/v1/quotes/random",
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
