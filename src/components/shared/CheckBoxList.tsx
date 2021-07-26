import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC } from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export type ID = number | String;

export interface CheckBoxListItem {
  name: string,
  id: ID
}

interface CheckBoxListProps {
  allItems: CheckBoxListItem[]
  onChange: (items: ID[]) => void
  checked: ID[]
}

export const CheckBoxList: FC<CheckBoxListProps> = ({ allItems, onChange, checked }) => {
  const classes = useStyles();

  const handleToggle = (id: ID) => () => {
    const currentIndex = checked.findIndex((checkedId) => checkedId === id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onChange(newChecked);
  };

  return (
    <List className={classes.root}>
      {allItems.map(({ name, id }) => {
        const labelId = `checkbox-list-label-${id}`;

        return (
          <ListItem
            key={`${id}`}
            role={undefined}
            dense
            button
            onClick={handleToggle(id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.includes(id)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={name} />
          </ListItem>
        );
      })}
    </List>
  );
};
