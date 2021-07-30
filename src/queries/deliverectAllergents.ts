/* eslint-disable camelcase */
import { gql, useQuery } from '@apollo/client';

export interface Allergent {
  allergent: string,
  integer_value: number
}

export interface AllergentEntity {
  allergent: Allergent
}

export interface ApolloItems<T> {
  items: T[]
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

export interface AllergentParsed {
  name: string,
  id: number
}

export const useGetAllergents = (): AllergentParsed[] | null => {
  const { data: dataAllergent } = useQuery<GetDeliverectAllergentsData>(GET_DELIVERECT_ALLERGENTS);

  if (!dataAllergent) return null;

  return dataAllergent.deliverect_allergent
    .map(({ allergent, integer_value }) => ({ name: allergent, id: integer_value }));
};

// // CREATE_DELIVERECT_ALLERGENT
// // DELETE_DELIVERECT_ALLERGENT
