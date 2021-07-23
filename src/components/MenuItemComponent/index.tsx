/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ChangeEvent, FC, useState } from 'react';
import { GET_DELIVERECT_ALLERGENTS } from '../../queries/crudMenu';
import {
  AllergentEntity, DeliverectAllergents, deliverectAllergentsType, UpdateMenuItem,
} from '../../types';
import TransitionsModal from '../modalSave/index';
import CheckBoxList, { ID } from '../shared/CheckBoxList';
import './checkContainer.css';

export interface PropsMenuItem {
  maxTemp: string
  maxWeight: string
  minTemp: string
  minWeight: string
  nameProps: string
  sku: string
  uuid: string
  deliverectAllergents: Array<deliverectAllergentsType>
  onSave: (obj: UpdateMenuItem) => void
}

const SetMenu: FC<PropsMenuItem> = (props) => {
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

  const { data: dataAllergent } = useQuery<DeliverectAllergents>(GET_DELIVERECT_ALLERGENTS);

  if (!dataAllergent) return null; // loading

  const saveMenu = () => {
    handleModal(true);
    setTimeout(() => {
      handleModal(false);
    }, 3000);
    const arrayAllergent: AllergentEntity[] = [];

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
      <div className="block-edit-menu">
        <div className="upBlock">
          <TextField
            disabled
            className="outlined-disabled SKU paddingInput"
            label="SKU"
            defaultValue={props.sku}
            variant="outlined"
          />
          <TextField
            className="outlined-required name paddingInput"
            label="Name"
            defaultValue={name}
            onChange={changeHandler(setName)}
            variant="outlined"
          />
        </div>
        <div className="twoBlock">
          <TextField
            className="outlined-required otherInp  paddingInput"
            label="Minimum weight (g)"
            defaultValue={minWeight}
            onChange={changeHandler(setMinWeight)}
            variant="outlined"
          />
          <TextField
            className="outlined-required otherInp paddingInput"
            label="Maximum weight (g)"
            defaultValue={maxWeight}
            onChange={changeHandler(setMaxWeight)}
            variant="outlined"
          />
          <TextField
            className="outlined otherInp"
            label="Minimum temp.(C)"
            defaultValue={minTemp}
            onChange={changeHandler(setMinTemp)}
            variant="outlined"
          />
          <TextField
            className="outlined-required otherInp"
            label="Maximum temp.(C)"
            defaultValue={maxTemp}
            onChange={changeHandler(setMaxTemp)}
            variant="outlined"
          />
        </div>
        <div className="bottomBlock">
          <div className="box">
            <span className="boxTitle">Allergent</span>
            <div className="listWrapper">
              <CheckBoxList
                allItems={ListAllergentsForChecked}
                onChange={setArrayList}
                checked={arrayList}
              />
            </div>
          </div>
          <div className="blockBtn">
            <Button variant="contained" style={{ background: '#c4f1c8' }} onClick={saveMenu} className="btn-save">
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetMenu;
