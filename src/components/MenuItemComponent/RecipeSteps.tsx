/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
import { makeStyles } from '@material-ui/core/styles';
import { FC, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Control, DeepMap, FieldError, UseFormRegister, UseFormSetValue, UseFormClearErrors,
} from 'react-hook-form';
import Button from '@material-ui/core/Button';

import { recipeStep } from '../../queries/recipes';
import { RecipeInput } from './RecipeInputs';
import { IFormInputs } from '../../types';

const styles = makeStyles({
  root: {
    marginTop: '30px',
  },
  containerAdd: {
    marginTop: '-20px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '15px',
    marginBottom: '20px',
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
    paddingBottom: '26px',
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
    marginTop: '6px',
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
  const [arrSteps, setArrSteps] = useState<recipeStep[]>(recipeSteps);

  const addStep = () => {
    const nextStep = arrSteps.length + 1;
    setArrSteps([...arrSteps, {
      step: nextStep,
      is_pause: false,
      pause_time: null,
      cooking_time_weight_coefficient: 0,
      microwave_power: 0,
      heat_temperature: 0,
      fan_speed: 0,
    }]);
  };
  const removeLastStep = (index: number) => {
    const conf = confirm('Are you sure you want to delete the last step?');
    if (conf) { setArrSteps(arrSteps.filter(({ step }) => step !== index)); }
  };

  return (
    <div className={style.root}>
      {arrSteps.map((stepObj, index) => (
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
              showRemoveStepBtn={arrSteps.length === stepObj.step}
              clearErrors={clearErrors}
              index={index}
              control={control}
              errors={errors}
              stepObj={stepObj}
              register={register}
              setValue={setValue}
              removeStep={removeLastStep}
            />
          </div>
        </div>
      ))}
      <div className={style.containerAdd}>
        <Button
          variant="contained"
          onClick={addStep}
          style={{
            background: '#C7DBC7', marginRight: '20px', borderRadius: '100px', height: '60px',
          }}
        >
          <Typography variant="h4">
            +
          </Typography>
        </Button>
        <Typography variant="h6" style={{ marginTop: '6px' }}>
          Add new step
        </Typography>
      </div>
    </div>
  );
};
