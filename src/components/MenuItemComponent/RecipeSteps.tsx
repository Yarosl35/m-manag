/* eslint-disable camelcase */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { ChangeEvent, FC, useState } from 'react';
import { recipeStep } from '../../queries/recipes';
import { RecipeInput } from './RecipeInputs';

const styleRecipeSteps = makeStyles({
  root: {
    marginTop: '30px',
  },
  main: {
    display: 'flex',
    marginTop: '-10px',
  },
  switchTrue: {
    marginTop: '5px',
    marginBottom: '10px',
  },
  switchFalse: {
    marginTop: '5px',
    marginBottom: '20px',
  },
  line: {
    transform: 'rotate(90deg)',
    width: '14px',
    height: '3px',
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
    display: 'flex', flexDirection: 'column',
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: '25px',
    marginRight: '25px',
  },
});
interface PropsReciped {
  recipeSteps: recipeStep[]
}
export const RecipeSteps: FC<PropsReciped> = ({ recipeSteps }) => {
  const style = styleRecipeSteps();
  const [state, setState] = useState({
    checked: true,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <div className={style.root}>
      {recipeSteps.map(({
        cooking_time_weight_coefficient,
        step, pause_time, microwave_power,
        is_pause, fan_speed, heat_temperature,
      }) => (
        <div key={step} className={style.main}>
          <div className={style.leftContainer}>
            <div className={style.step}>
              {step}
            </div>
            <div className={style.line} />
          </div>
          <div className={style.secondDiv}>
            <FormControlLabel
              className={is_pause ? style.switchTrue : style.switchFalse}
              control={(
                <Switch
                  checked={is_pause}
                  onChange={handleChange}
                  name="pause"
                  color="primary"
                />
               )}
              label="Is pause?"
            />
            <RecipeInput
              value="Weight-time coefficient"
              variable={cooking_time_weight_coefficient}
            />
            <RecipeInput
              value="pause time"
              variable={pause_time}
            />
            <RecipeInput
              value="microwave power"
              variable={microwave_power}
            />
            <RecipeInput
              value="heat temperature"
              variable={heat_temperature}
            />
            <RecipeInput
              value="fan speed"
              variable={fan_speed}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
