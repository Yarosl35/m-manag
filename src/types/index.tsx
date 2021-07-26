/* eslint-disable camelcase */
export interface UpdateMenuItem {
    menu_item_uuid: string
    name: string
    min_weight: string
    max_weight: string
    min_temp: string
    max_temp: string
    deliverect_menu_item_allergents: {menu_item_uuid: string, deliverect_allergent: string}[],
    menu_item_allergents: string[],
}
