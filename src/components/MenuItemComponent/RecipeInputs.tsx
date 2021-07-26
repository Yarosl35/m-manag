import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FC } from 'react';

const styleRecipeInput = makeStyles({
  root: {
    marginBottom: '25px',
  },
});

interface PropsInput {
    variable: number | null
    value: string
}
export const RecipeInput: FC<PropsInput> = ({ variable, value }) => {
  const style = styleRecipeInput();
  return (
    <>
      { variable ? (
        <TextField
          className={style.root}
          label={value}
          defaultValue={variable}
          variant="outlined"
        />
      ) : null }
    </>
  );
};
