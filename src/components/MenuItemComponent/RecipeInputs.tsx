/* eslint-disable camelcase */
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import {
  FC, useState, ChangeEvent, useEffect,
} from 'react';
import {
  Controller,
} from 'react-hook-form';
import { recipeStep } from '../../queries/recipes';
import { ReactFormHookProps } from './RecipeSteps';

const styles = makeStyles({
  paddingInput: {
    marginBottom: '25px',
  },
  switchTrue: {
    marginTop: '5px',
    marginBottom: '10px',
  },
  switchFalse: {
    marginTop: '5px',
    marginBottom: '20px',
  },
});

interface PropsRecipe extends ReactFormHookProps {
  stepObj: recipeStep
  index: number
}
const defaultValue = (value: number | null) => (!value ? 0 : value);

export const RecipeInput: FC<PropsRecipe> = ({
  control, errors, index, register, setValue, clearErrors,
  stepObj: {
    cooking_time_weight_coefficient,
    fan_speed, step, pause_time, heat_temperature, microwave_power, is_pause,
  },
}) => {
  const [isPause, setIsPause] = useState<boolean>(is_pause);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPause(event.target.checked);
    if (event.target.checked) {
      setValue(`menu_item_recipe_steps.${index}.pause_time`, defaultValue(pause_time));
      clearErrors(`menu_item_recipe_steps.${index}.pause_time`);
    } else {
      setValue(`menu_item_recipe_steps.${index}.cooking_time_weight_coefficient`, defaultValue(cooking_time_weight_coefficient));
      setValue(`menu_item_recipe_steps.${index}.microwave_power`, defaultValue(microwave_power));
      setValue(`menu_item_recipe_steps.${index}.heat_temperature`, defaultValue(heat_temperature));
      setValue(`menu_item_recipe_steps.${index}.fan_speed`, defaultValue(fan_speed));
      clearErrors([
        `menu_item_recipe_steps.${index}.cooking_time_weight_coefficient`,
        `menu_item_recipe_steps.${index}.microwave_power`,
        `menu_item_recipe_steps.${index}.heat_temperature`,
        `menu_item_recipe_steps.${index}.fan_speed`,
      ]);
    }
  };
  const style = styles();

  useEffect(() => {
    setValue(`menu_item_recipe_steps.${index}.is_pause`, isPause);
  }, [isPause]);

  return (
    <>
      <FormControlLabel
        control={(
          <Switch
            checked={isPause}
            onChange={handleChange}
            color="primary"
          />
        )}
        label="Is pause?"
      />
      {isPause ? (
        <Controller
          name={`menu_item_recipe_steps.${index}.pause_time`}
          control={control}
          defaultValue={defaultValue(pause_time)}
          render={({ field }) => (
            <TextField
              {...field}
              className={style.paddingInput}
              label="pause time"
              variant="outlined"
              error={!!errors?.menu_item_recipe_steps?.[index]?.pause_time}
              helperText={errors.menu_item_recipe_steps?.[index]?.pause_time
                ? errors?.menu_item_recipe_steps?.[index]?.pause_time?.message : ''}
            />
          )}
        />
      ) : (
        <>
          <Controller
            name={`menu_item_recipe_steps.${index}.cooking_time_weight_coefficient`}
            control={control}
            defaultValue={defaultValue(cooking_time_weight_coefficient)}
            render={({ field }) => (
              <TextField
                {...field}
                className={style.paddingInput}
                label="Weight-time coefficient"
                variant="outlined"
                error={!!errors
                  ?.menu_item_recipe_steps?.[index]?.cooking_time_weight_coefficient}
                helperText={errors.menu_item_recipe_steps?.
                  [index]?.cooking_time_weight_coefficient
                  ? errors?.menu_item_recipe_steps?.[index]?.cooking_time_weight_coefficient?.message : ''}
              />
            )}
          />
          <Controller
            name={`menu_item_recipe_steps.${index}.microwave_power`}
            control={control}
            defaultValue={defaultValue(microwave_power)}
            render={({ field }) => (
              <TextField
                {...field}
                className={style.paddingInput}
                label="pause microwave"
                variant="outlined"
                error={!!errors?.menu_item_recipe_steps?.[index]?.microwave_power}
                helperText={errors.menu_item_recipe_steps?.[index]?.microwave_power
                  ? errors?.menu_item_recipe_steps?.[index]?.microwave_power?.message : ''}
              />
            )}
          />
          <Controller
            name={`menu_item_recipe_steps.${index}.heat_temperature`}
            control={control}
            defaultValue={defaultValue(heat_temperature)}
            render={({ field }) => (
              <TextField
                {...field}
                className={style.paddingInput}
                label="heat temperature"
                variant="outlined"
                error={!!errors?.menu_item_recipe_steps?.[index]?.heat_temperature}
                helperText={errors.menu_item_recipe_steps?.[index]?.heat_temperature
                  ? errors?.menu_item_recipe_steps?.[index]?.heat_temperature?.message : ''}
              />
            )}
          />
          <Controller
            name={`menu_item_recipe_steps.${index}.fan_speed`}
            control={control}
            defaultValue={defaultValue(fan_speed)}
            render={({ field }) => (
              <TextField
                {...field}
                className={style.paddingInput}
                label="fan speed"
                variant="outlined"
                error={!!errors?.menu_item_recipe_steps?.[index]?.fan_speed}
                helperText={errors.menu_item_recipe_steps?.[index]?.fan_speed
                  ? errors?.menu_item_recipe_steps?.[index]?.fan_speed?.message : ''}
              />
            )}
          />

        </>
      )}
      <input type="hidden" defaultValue={step} {...register(`menu_item_recipe_steps.${index}.step`)} />
      <input
        type="hidden"
        defaultValue={`${isPause}`}
        {...register(`menu_item_recipe_steps.${index}.is_pause`)}
      />
    </>
  );
};
