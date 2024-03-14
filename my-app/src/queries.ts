import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query GetData {
    getData {
      id
      fname
      mail
      number
      website
      contactName
      contactPhone
      contactMail
      notes
      type
      category
      percentage
      activeFrom
      criticalAccount
      paymentOptions
    }
  }
`;

export const CREATE_DATA = gql`
  mutation CreateData($input: DataInput!) {
    createData(data: $input) {
      id
      fname
      mail
      number
      website
      contactName
      contactPhone
      contactMail
      notes
      type
      category
      percentage
      activeFrom
      criticalAccount
      paymentOptions
    }
  }
`;

export const UPDATE_DATA = gql`
  mutation UpdateData($id: String!, $input: DataInput!) {
    updateData(id: $id, data: $input) {
      id
      fname
      mail
      number
      website
      contactName
      contactPhone
      contactMail
      notes
      type
      category
      percentage
      activeFrom
      criticalAccount
      paymentOptions
    }
  }
`;

export const DELETE_DATA = gql`
  mutation DeleteData($id: String!) {
    deleteData(id: $id) {
      id
    }
  }
`;
