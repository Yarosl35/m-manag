/* eslint-disable camelcase */

import { Allergent, AllergentParsed } from '../queries/deliverectAllergents';
import {
  UpdateMenuItem, ID, IFormInputs,
} from '../types/index';

export const prepareMutationDataMenu = (data: IFormInputs, uuid: string, arrayList: ID[],
  dataAllergent: AllergentParsed[]) => {
  const formattedData = {
    ...data,
    menu_item_recipe_steps: data?.menu_item_recipe_steps?.map((step) => ({
      menu_item_uuid: uuid,
      fan_speed: !step.is_pause ? step.fan_speed : null,
      heat_temperature: !step.is_pause ? step.heat_temperature : null,
      microwave_power: !step.is_pause ? step.microwave_power : null,
      pause_time: !step.is_pause ? null : step.pause_time,
      cooking_time_weight_coefficient: !step.is_pause ? step.cooking_time_weight_coefficient
        : null,
      is_pause: step.is_pause,
      step: step.step,
    })),
    steps: data?.menu_item_recipe_steps?.map((step) => (step.step)),
  };
  const arrayAllergent: Allergent[] = [];

  for (const id of arrayList) {
    const allergentFound = dataAllergent.find(({ id: allergentId }) => allergentId === id);

    if (allergentFound) {
      arrayAllergent.push({
        allergent: allergentFound.name,
        integer_value: allergentFound.id,
      });
    }
  }

  const arrayWithIdMenu = arrayAllergent
    .map(({ allergent }) => (
      { menu_item_uuid: uuid, deliverect_allergent: allergent }));

  const arrayString = arrayAllergent
    .map(({ allergent }) => allergent);

  const objUpdateMenuItem: UpdateMenuItem = {
    menu_item_uuid: uuid,
    ...formattedData,
    deliverect_menu_item_allergents: arrayWithIdMenu,
    menu_item_allergents: arrayString,
  };
  return objUpdateMenuItem;
};
