import { apiSlice } from "../apiSlice";

const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "/customer/list",
    }),
    getDetailCustomer: builder.query({
      query: (qrcode) => `/customer/detail?qrCode=${qrcode}`,
    }),
    updateCustomerWallet: builder.mutation({
      query: (data) => ({
        url: "/customer/payment",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetDetailCustomerQuery,
  useUpdateCustomerWalletMutation,
} = customerApiSlice;
