/* eslint-disable camelcase */

import * as yup from 'yup';

export const menuSchema = yup.object().shape({
  name: yup.string().typeError('please fill out this field').min(1, 'Name must be at least 1 characters')
    .matches(/^[a-zzñáéíóúü\d/-\s]+$/i, 'Is not in correct format')
    .required(),
  min_weight: yup.number().typeError('please fill out this field').min(0).max(100, 'Minimum weight must be 0-100')
    .required(),
  max_weight: yup.number().typeError('please fill out this field').min(0).max(1000, 'Maximum weight must be 0-1000')
    .required(),
  min_temp: yup.number().typeError('please fill out this field').min(0).max(100, 'Minimum temp. must be 0-100')
    .required(),
  max_temp: yup.number().typeError('please fill out this field').min(0).max(100, 'Maximum temp. must be 0-100')
    .required(),
  menu_item_recipe_steps: yup.array().of(
    yup.object().shape({
      step: yup.number(),
      is_pause: yup.boolean(),
      cooking_time_weight_coefficient: yup.number().typeError('Is not in correct format').min(0.00).max(10.00, 'Maximum temp. must be 0.00-10.00'),
      pause_time: yup.number().typeError('Is not in correct format').min(0).max(100, 'Maximum temp. must be 0-100'),
      microwave_power: yup.number().typeError('Is not in correct format').min(0).max(100, 'Maximum temp. must be 0-100'),
      heat_temperature: yup.number().typeError('Is not in correct format').min(0).max(100, 'Maximum temp. must be 0-100'),
      fan_speed: yup.number().typeError('Is not in correct format').min(0).max(100, 'Maximum temp. must be 0-100'),
    }),
  ),

});
