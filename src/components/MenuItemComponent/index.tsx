/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FC, useState } from 'react';
import {
  useForm,
  Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AllergentEntity, useGetAllergents } from '../../queries/deliverectAllergents';
import { recipeStep } from '../../queries/recipes';
import { UpdateMenuItem, ID, IFormInputs } from '../../types';
import { TransitionsModal } from '../modalSave/index';
import { CheckBoxList } from '../shared/CheckBoxList';
import { Сontainer } from '../shared/Container';
import { RecipeSteps } from './RecipeSteps';
import { menuSchema } from '../../services/validationService';
import { prepareMutationDataMenu } from '../../services/transformService';

const styles = makeStyles({
  blockB: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  blockEditMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '750px',
    height: '100%',
    padding: '10px',
  },
  btnSave: {
    width: '400px',
    marginBottom: '15px',
  },
  '@media (max-width: 750px)': {
    blockEditMenu: {
      width: '100%',
    },
    btnSave: {
      width: '100%',
    },
  },
  upBlock: {
    marginBottom: '15px',
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    gap: '10px',
  },
  twoBlock: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  bottomBlock: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  blockBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paddingInput: {
    marginBottom: '40px',
  },
  openHeighContainer250: {
    maxHeight: '250px',
  },
  openHeighContainer400: {
    maxHeight: '400px',
  },
});
export interface PropsMenuItem {
  maxTemp: number
  maxWeight: number
  minTemp: number
  minWeight: number
  nameProps: string
  sku: string
  uuid: string
  deliverectAllergents: Array<AllergentEntity>
  recipeSteps: recipeStep[]
  onSave: (obj: UpdateMenuItem) => void
}

export const SetMenu: FC<PropsMenuItem> = (props) => {
  const style = styles();
  const deliverectAllergentsNew = props.deliverectAllergents
    .map(({ allergent: { integer_value } }) => integer_value);

  const [arrayList, setArrayList] = useState <Array<ID>>(deliverectAllergentsNew);
  const [open, setOpen] = useState(false);

  const handleModal = (value: boolean) => {
    setOpen(value);
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(menuSchema),
  });

  const allergentList = useGetAllergents();

  if (!allergentList) return null; // loading

  const onSubmit = (data: IFormInputs) => {
    handleModal(true);
    setTimeout(() => {
      handleModal(false);
    }, 3000);
    const formattedDataMenu = prepareMutationDataMenu(data, props.uuid, arrayList, allergentList);

    props.onSave(formattedDataMenu);
  };

  return (
    <>
      <TransitionsModal open={open} handleModal={handleModal} />
      <div className={style.blockEditMenu}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.upBlock}>
            <TextField
              disabled
              className={style.paddingInput}
              label="SKU"
              defaultValue={props.sku}
              variant="outlined"
            />
            <Controller
              name="name"
              control={control}
              defaultValue={props.nameProps}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={style.paddingInput}
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name?.message : ''}
                />
              )}
            />
          </div>
          <div className={style.twoBlock}>
            <Controller
              name="min_weight"
              control={control}
              defaultValue={props.minWeight}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={style.paddingInput}
                  label="Minimum weight (g)"
                  variant="outlined"
                  error={!!errors.min_weight}
                  helperText={errors.min_weight ? errors.min_weight?.message : ''}
                />
              )}
            />
            <Controller
              name="max_weight"
              control={control}
              defaultValue={props.maxWeight}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={style.paddingInput}
                  label="Maximum weight (g)"
                  variant="outlined"
                  error={!!errors.max_weight}
                  helperText={errors.max_weight ? errors.max_weight?.message : ''}
                />
              )}
            />
            <Controller
              name="min_temp"
              control={control}
              defaultValue={props.minTemp}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={style.paddingInput}
                  label="Minimum temp.(℃)"
                  variant="outlined"
                  error={!!errors.min_temp}
                  helperText={errors.min_temp ? errors.min_temp?.message : ''}
                />
              )}
            />
            <Controller
              name="max_temp"
              control={control}
              defaultValue={props.maxTemp}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={style.paddingInput}
                  label="Maximum temp.(℃)"
                  variant="outlined"
                  error={!!errors.max_temp}
                  helperText={errors.max_temp ? errors.max_temp?.message : ''}
                />
              )}
            />
          </div>
          <div className={style.blockB}>
            <div className={style.bottomBlock}>
              <Сontainer open name="Allergents" maxHeightClass={style.openHeighContainer250}>
                <CheckBoxList
                  allItems={allergentList}
                  onChange={setArrayList}
                  checked={arrayList}
                />
              </Сontainer>
              <Сontainer open={false} name="Recipe steps" maxHeightClass={style.openHeighContainer400}>
                <RecipeSteps
                  control={control}
                  register={register}
                  recipeSteps={props.recipeSteps}
                  errors={errors}
                  clearErrors={clearErrors}
                  setValue={setValue}
                />
              </Сontainer>
            </div>
            <div className={style.blockBtn}>
              <Button
                type="submit"
                style={{ background: '#c4f1c8' }}
                className={style.btnSave}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
