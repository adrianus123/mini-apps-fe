import { gql } from "@apollo/client";

const ADD_TO_CART = gql`
  mutation AddToCart(
    $qrcode: String!
    $rfid: String!
    $nama: String!
    $harga: Float!
    $jumlah: Int!
  ) {
    addToCart(
      qrcode: $qrcode
      rfid: $rfid
      nama: $nama
      harga: $harga
      jumlah: $jumlah
    ) {
      qrcode
      rfid
      nama
      harga
      jumlah
    }
  }
`;

const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($qrcode: String!, $rfid: String!) {
    deleteCartItem(qrcode: $qrcode, rfid: $rfid) {
      qrcode
      rfid
    }
  }
`;

const DELETE_CART = gql`
  mutation DeleteCart($qrcode: String!) {
    deleteCart(qrcode: $qrcode) {
      qrcode
    }
  }
`;

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($qrcode: String!, $barang: [BarangInput]!) {
    createTransaction(qrcode: $qrcode, barang: $barang) {
      createdAt
    }
  }
`;

export { ADD_TO_CART, DELETE_CART_ITEM, DELETE_CART, CREATE_TRANSACTION };
