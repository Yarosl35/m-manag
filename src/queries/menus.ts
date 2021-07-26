/* eslint-disable camelcase */
import { gql } from '@apollo/client';
import { AllergentEntity } from './deliverectAllergents';
import { recipeStep } from './recipes';

export interface MenuItemShort {
  uuid: string
  sku: string
  name:string
}

export interface GetMenuItemsData {
  menu_item: MenuItemShort[]
}

export const GET_MENU_ITEMS = gql`
    query {
        menu_item(order_by: {sku: asc}) {
            uuid
            sku
            name
        }
    }
`;

export interface MenuItem {
  sku: string
  name: string
  min_weight: string
  max_weight: string
  min_temp: string
  max_temp: string
  deliverect_allergents: AllergentEntity[]
  recipe_steps: recipeStep[]
}

export interface GetMenuItemData {
  menu_item: MenuItem[]
}

export const GET_MENU_ITEM = gql`
  query GetMenuItem($menu_item_uuid: uuid!) {
  menu_item(where: {uuid: {_eq: $menu_item_uuid}}) {
    sku
    name
    min_weight
    max_weight
    min_temp
    max_temp
    deliverect_allergents {
      allergent {
        integer_value
        allergent
      }
    }
    recipe_steps(order_by: {step: asc}) {
      step
      is_pause
      pause_time
      cooking_time_weight_coefficient
      microwave_power
      heat_temperature
      fan_speed
    }
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
      where: { 
        uuid: { _eq: $menu_item_uuid } }
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
          ) { affected_rows }
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

// CREATE_MENU_ITEM
// DELETE_MENU_ITEM
