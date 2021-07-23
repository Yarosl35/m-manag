import { gql } from '@apollo/client';

export const GET_MENU_ITEM = gql`
  query GetMenuItem($menu_item_uuid: uuid!) {
    menu_item(where: {
      uuid: {
        _eq: $menu_item_uuid
      }
    }) {
      sku
      name
      min_weight
      max_weight
      min_temp
      max_temp
      deliverect_allergents {
        allergent {
          allergent
          integer_value
        }
      }
    }
  }
`;

export const GET_DELIVERECT_ALLERGENTS = gql`
  query GetDeliverectAllergents {
    deliverect_allergent {
      allergent
      integer_value
    }
  }
`;

export const UPDATE_MENU_ITEM = gql` 
  mutation UpdateMenuItem(
    $menu_item_uuid: uuid!
    $name: String!
    $min_weight: Int!
    $max_weight: Int!
    $min_temp: Int!
    $max_temp: Int
    $deliverect_menu_item_allergents: [deliverect_menu_item_allergent_insert_input!]!
    $menu_item_allergents: [String!]!
  ) {
    update_menu_item(
    where: { uuid: { _eq: $menu_item_uuid } }
    _set: {
    name: $name
    min_weight: $min_weight
    max_weight: $max_weight
    min_temp: $min_temp
    max_temp: $max_temp
    }
    ) {
      affected_rows
      }
      insert_deliverect_menu_item_allergent(
      objects: $deliverect_menu_item_allergents
      on_conflict: {
      constraint: deliverect_menu_item_allergent_pkey
      update_columns: deliverect_allergent
      }
      ) {
        affected_rows
        }
        delete_deliverect_menu_item_allergent(
        where: {
        _and: {
        menu_item_uuid: { _eq: $menu_item_uuid }
        deliverect_allergent: { _nin: $menu_item_allergents }
        }
        }
        ) {
        affected_rows
    }
  }
`;
