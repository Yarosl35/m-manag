/* eslint-disable camelcase */
export interface arraySteps {
    cooking_time_weight_coefficient: number | null
    pause_time: number | null
    microwave_power: number | null
    heat_temperature: number | null
    fan_speed: number | null
    is_pause: boolean
    step: string
  }
  interface arrayStepsUuid extends arraySteps{
    menu_item_uuid: string
  }
export interface IFormInputs {
    name: string
    min_weight: number
    max_weight: number
    min_temp: number
    max_temp: number
    menu_item_recipe_steps: arraySteps[]
  }
export type ID = number | String;

export interface transformMenuItem {
    menu_item_uuid: string
    name: string
    min_weight: number
    max_weight: number
    min_temp: number
    max_temp: number
    deliverect_menu_item_allergents: {menu_item_uuid: string, deliverect_allergent: string}[],
    menu_item_allergents: string[]
    menu_item_recipe_steps: arrayStepsUuid[]
    steps: string[]
}
export interface UpdateMenuItem extends transformMenuItem {
    menu_item_uuid: string
    deliverect_menu_item_allergents: {menu_item_uuid: string, deliverect_allergent: string}[],
    menu_item_allergents: string[]
}
