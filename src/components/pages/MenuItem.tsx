/* eslint-disable camelcase */

import { useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { GetMenuItemData, GET_MENU_ITEM, UPDATE_MENU_ITEM } from '../../queries/menus';
import { UpdateMenuItem } from '../../types';
import { Layout } from '../layout';
import { Loader } from '../loader/Loader';
import { SetMenu } from '../MenuItemComponent';

const styles = makeStyles({
  root: {
    padding: '10px',
    display: 'flex',
    height: '100%',
    marginTop: '10px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MenuItem: FC = () => {
  const style = styles();
  const { uuid } = useParams<{uuid: string}>();

  const { data: menuItem, refetch } = useQuery<GetMenuItemData>(GET_MENU_ITEM, {
    variables: {
      menu_item_uuid: uuid,
    },
  });

  const [updateMenu] = useMutation(UPDATE_MENU_ITEM, {
    onCompleted: refetch,
  });
  const onSave = (objUpdateMenu: UpdateMenuItem) => {
    updateMenu({
      variables: objUpdateMenu,
    });
  };
  if (!menuItem) return <Layout><Loader /></Layout>;

  const {
    max_temp, max_weight, min_temp, min_weight, name, sku, deliverect_allergents, recipe_steps,
  } = menuItem.menu_item[0];
  return (
    <Layout>
      <div className={style.root}>
        <SetMenu
          maxTemp={max_temp}
          maxWeight={max_weight}
          minTemp={min_temp}
          minWeight={min_weight}
          nameProps={name}
          sku={sku}
          uuid={uuid}
          onSave={onSave}
          deliverectAllergents={deliverect_allergents}
          recipeSteps={recipe_steps}
        />
      </div>
    </Layout>
  );
};
