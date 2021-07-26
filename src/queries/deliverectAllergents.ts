/* eslint-disable camelcase */
import { gql } from '@apollo/client';

export interface Allergent {
  allergent: string,
  integer_value: number
}

export interface AllergentEntity {
  allergent: Allergent
}

export interface GetDeliverectAllergentsData {
  deliverect_allergent: Allergent[]
}

export const GET_DELIVERECT_ALLERGENTS = gql`
  query GetDeliverectAllergents {
    deliverect_allergent {
      allergent
      integer_value
    }
  }
`;

// // CREATE_DELIVERECT_ALLERGENT
// // DELETE_DELIVERECT_ALLERGENT
