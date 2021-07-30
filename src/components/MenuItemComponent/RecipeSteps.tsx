/* eslint-disable camelcase */

import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import {
  Control, DeepMap, FieldError, UseFormRegister, UseFormSetValue, UseFormClearErrors,
} from 'react-hook-form';
import { recipeStep } from '../../queries/recipes';
import { RecipeInput } from './RecipeInputs';
import { IFormInputs } from '../../types';

const styles = makeStyles({
  root: {
    marginTop: '30px',
  },
  main: {
    display: 'flex',
    marginTop: '-10px',
  },
  containerForNUmberStep: {
    width: '100%',
  },
  containerForLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: '15px',
  },
  line: {
    width: '3px',
    height: '100%',
    background: '#c4c4c4',
    borderRadius: '20px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e3e3e3',
    width: '40px',
    height: '40px',
    borderRadius: '50px',
    boxShadow: '0px 0px 8px 4px rgba(34, 60, 80, 0.15)',
    fontSize: '1.3em',
    marginBottom: '10px',
  },
  secondDiv: {
    paddingTop: '4px',
    display: 'flex',
    flexDirection: 'column',
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: '25px',
    marginRight: '25px',
  },
});

export interface ReactFormHookProps {
  control: Control<IFormInputs>
  errors: DeepMap<IFormInputs, FieldError>
  register: UseFormRegister<IFormInputs>
  setValue: UseFormSetValue<IFormInputs>
  clearErrors: UseFormClearErrors<IFormInputs>
}
interface PropsRecipe extends ReactFormHookProps {
  recipeSteps: recipeStep[]
}
export const RecipeSteps: FC<PropsRecipe> = ({
  recipeSteps, control, errors, register, setValue, clearErrors,
}) => {
  const style = styles();

  return (
    <div className={style.root}>
      {recipeSteps.map((stepObj, index) => (
        <div key={stepObj.step} className={style.main}>
          <div className={style.leftContainer}>
            <div className={style.containerForNUmberStep}>
              <div className={style.step}>
                {stepObj.step}
              </div>
            </div>
            <div className={style.containerForLine}>
              <div className={style.line} />
            </div>
          </div>
          <div className={style.secondDiv}>
            <RecipeInput
              clearErrors={clearErrors}
              index={index}
              control={control}
              errors={errors}
              stepObj={stepObj}
              register={register}
              setValue={setValue}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
