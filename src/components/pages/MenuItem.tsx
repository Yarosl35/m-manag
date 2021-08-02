/* eslint-disable camelcase */

// import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TransitionsModal } from '../modalSave/index';
import { useGetMenuItem, useUpdateMenuItem } from '../../queries/menus';
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
  const [open, setOpen] = useState(false);

  const { uuid } = useParams<{uuid: string}>();
  const menuItem = useGetMenuItem(uuid);
  const { updateMenu, loading } = useUpdateMenuItem(uuid);

  const handleModal = (value: boolean) => {
    setOpen(value);
  };

  const onSave = (updatedMenu: UpdateMenuItem) => {
    if (!loading) { handleModal(true); }
    updateMenu({
      variables: updatedMenu,
    });
  };

  if (!menuItem) return <Layout><Loader /></Layout>;

  const {
    max_temp, max_weight, min_temp, min_weight, name, sku, deliverect_allergents, recipe_steps,
  } = menuItem;
  return (
    <Layout>
      <TransitionsModal open={open} loading={loading} handleModal={handleModal} />
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
