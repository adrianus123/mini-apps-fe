import { gql } from "@apollo/client";

const CART_QUERY = gql`
  query GetCart($qrcode: String!) {
    getCart(qrcode: $qrcode) {
      rfid
      nama
      harga
      jumlah
    }
  }
`;

export { CART_QUERY };
