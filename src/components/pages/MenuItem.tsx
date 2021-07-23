import { useMutation, useQuery } from '@apollo/client';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { GET_MENU_ITEM, UPDATE_MENU_ITEM } from '../../queries/crudMenu';
import { UpdateMenuItem } from '../../types';
import Layout from '../layout';
import SetMenu from '../MenuItemComponent';
import './styles/MenuItem.css';

const EditMenu: FC = () => {
  const { uuid } = useParams<{uuid: string}>();

  const { data: menuItem } = useQuery(GET_MENU_ITEM, {
    variables: {
      menu_item_uuid: uuid,
    },
  });

  const [updateMenu] = useMutation(UPDATE_MENU_ITEM, {
    refetchQueries: [{
      query: GET_MENU_ITEM,
      variables: {
        menu_item_uuid: uuid,
      },
    }],
    awaitRefetchQueries: true,
  });

  const onSave = (objUpdateMenu: UpdateMenuItem) => {
    updateMenu({
      variables: objUpdateMenu,
    });
  };
  if (!menuItem) return null;

  /* eslint-disable camelcase */
  const {
    max_temp, max_weight, min_temp, min_weight, name, sku, deliverect_allergents,
  } = menuItem.menu_item[0];
  return (
    <Layout>
      <div className="menu-item">
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
        />
      </div>
    </Layout>
  );
};

export default EditMenu;
