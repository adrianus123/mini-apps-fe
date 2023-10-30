import { apiSlice } from "../apiSlice";

const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/transaksi/list",
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionApiSlice;
