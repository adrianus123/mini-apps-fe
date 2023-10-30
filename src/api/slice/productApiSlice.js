import { apiSlice } from "../apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/barang/list",
    }),
    getDetailProduct: builder.query({
      query: (rfid) => `/barang/detail?rfid=${rfid}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetDetailProductQuery } =
  productApiSlice;
