/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ChangeEvent, FC, useState } from 'react';
import {
  Allergent, AllergentEntity, GetDeliverectAllergentsData, GET_DELIVERECT_ALLERGENTS,
} from '../../queries/deliverectAllergents';
import { recipeStep } from '../../queries/recipes';
import { UpdateMenuItem } from '../../types';
import { TransitionsModal } from '../modalSave/index';
import { CheckBoxList, ID } from '../shared/CheckBoxList';
import { Сontainer } from '../shared/Container';
import { RecipeSteps } from './RecipeSteps';

const styleMenuItem = makeStyles({
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
    // justifyContent: 'space-between',
    // height: '100%',
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
  maxTemp: string
  maxWeight: string
  minTemp: string
  minWeight: string
  nameProps: string
  sku: string
  uuid: string
  deliverectAllergents: Array<AllergentEntity>
  recipeSteps: recipeStep[]
  onSave: (obj: UpdateMenuItem) => void
}

export const SetMenu: FC<PropsMenuItem> = (props) => {
  const style = styleMenuItem();
  const deliverectAllergentsNew = props.deliverectAllergents
    .map(({ allergent: { integer_value } }) => integer_value);

  const [arrayList, setArrayList] = useState <Array<ID>>(deliverectAllergentsNew);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(props.nameProps);
  const [maxTemp, setMaxTemp] = useState<string>(props.maxTemp);
  const [maxWeight, setMaxWeight] = useState<string>(props.maxWeight);
  const [minTemp, setMinTemp] = useState<string>(props.minTemp);
  const [minWeight, setMinWeight] = useState<string>(props.minWeight);

  const handleModal = (value: boolean) => {
    setOpen(value);
  };

  const changeHandler = (setter: (value: string)=>void) => (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setter(newValue);
  };

  const { data: dataAllergent } = useQuery<GetDeliverectAllergentsData>(GET_DELIVERECT_ALLERGENTS);

  if (!dataAllergent) return null; // loading

  const saveMenu = () => {
    handleModal(true);
    setTimeout(() => {
      handleModal(false);
    }, 3000);
    const arrayAllergent: Allergent[] = [];

    for (const id of arrayList) {
      const obj = dataAllergent.deliverect_allergent
        .find(({ integer_value }) => integer_value === id);

      if (obj) {
        arrayAllergent.push(obj);
      }
    }

    const arrayWithIdMenu = arrayAllergent
      .map(({ allergent }) => (
        { menu_item_uuid: props.uuid, deliverect_allergent: allergent }));

    const arrayString = arrayAllergent
      .map(({ allergent }) => allergent);

    const objUpdateMenuItem: UpdateMenuItem = {
      menu_item_uuid: props.uuid,
      name,
      min_weight: minWeight,
      max_weight: maxWeight,
      min_temp: minTemp,
      max_temp: maxTemp,
      deliverect_menu_item_allergents: arrayWithIdMenu,
      menu_item_allergents: arrayString,
    };
    props.onSave(objUpdateMenuItem);
  };

  const ListAllergentsForChecked = dataAllergent.deliverect_allergent
    .map(({ allergent, integer_value }) => ({ name: allergent, id: integer_value }));

  return (
    <>
      <TransitionsModal open={open} handleModal={handleModal} />
      <div className={style.blockEditMenu}>
        <div className={style.upBlock}>
          <TextField
            disabled
            className={style.paddingInput}
            label="SKU"
            defaultValue={props.sku}
            variant="outlined"
          />
          <TextField
            className={style.paddingInput}
            label="Name"
            defaultValue={name}
            onChange={changeHandler(setName)}
            variant="outlined"
          />
        </div>
        <div className={style.twoBlock}>
          <TextField
            className={style.paddingInput}
            label="Minimum weight (g)"
            defaultValue={minWeight}
            onChange={changeHandler(setMinWeight)}
            variant="outlined"
          />
          <TextField
            className={style.paddingInput}
            label="Maximum weight (g)"
            defaultValue={maxWeight}
            onChange={changeHandler(setMaxWeight)}
            variant="outlined"
          />
          <TextField
            label="Minimum temp.(C)"
            defaultValue={minTemp}
            onChange={changeHandler(setMinTemp)}
            variant="outlined"
          />
          <TextField
            label="Maximum temp.(C)"
            defaultValue={maxTemp}
            onChange={changeHandler(setMaxTemp)}
            variant="outlined"
          />
        </div>
        <div className={style.blockB}>
          <div className={style.bottomBlock}>
            <Сontainer open name="Allergents" maxHeightClass={style.openHeighContainer250}>
              <CheckBoxList
                allItems={ListAllergentsForChecked}
                onChange={setArrayList}
                checked={arrayList}
              />
            </Сontainer>
            <Сontainer open={false} name="Recipe steps" maxHeightClass={style.openHeighContainer400}>
              <RecipeSteps recipeSteps={props.recipeSteps} />
            </Сontainer>
          </div>
          <div className={style.blockBtn}>
            <Button variant="contained" style={{ background: '#c4f1c8' }} onClick={saveMenu} className={style.btnSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
