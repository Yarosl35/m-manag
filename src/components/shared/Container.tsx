import { makeStyles } from '@material-ui/core/styles';
import { FC, useState } from 'react';

const styles = makeStyles({
  box: {
    position: 'relative',
    marginBottom: '25px',
  },
  boxTitle: {
    content: 'Allergent',
    position: 'absolute',
    color: 'grey',
    backgroundColor: 'white',
    fontSize: '12px',
    padding: '0 3px',
    top: '-5px',
    left: '15px',
    zIndex: 1,
  },
  toggle: {
    content: 'Allergent',
    position: 'absolute',
    color: 'grey',
    backgroundColor: 'white',
    fontSize: '12px',
    padding: '0 3px',
    top: '5px',
    right: 10,
    zIndex: 1,
    cursor: 'pointer',
    userSelect: 'none',
    paddingLeft: '50px',
  },
  listWrapper: {
    '&::-webkit-scrollbar': {
      display: 'block',
    },
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid gray',
    borderRadius: '10px',
    maxWidth: '100%',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
  },
  '@media (max-width: 750px)': {
    listWrapper: {
      alignItems: 'start',
    },
  },
  openHeighContainer: {
    maxHeight: '250px',
  },
  closeHeighContainer: {
    height: '20px',
  },
  showChildren: {
    display: 'block',
  },
  hideChildren: {
    display: 'none',
  },
});

interface propsLayoutContainer {
    open: boolean
    name: string
    maxHeightClass: string
}
export const Сontainer: FC<propsLayoutContainer> = ({
  open, children, name, maxHeightClass,
}) => {
  const [hendlerContainer, setHendlerContainer] = useState<boolean>(open);
  const style = styles();
  const toggleChange = () => {
    setHendlerContainer(!hendlerContainer);
  };
  return (
    <div className={style.box}>
      <span className={style.boxTitle}>{name}</span>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleChange}
        onKeyDown={toggleChange}
        className={style.toggle}
      >
        {hendlerContainer ? <span>&#9650;</span> : <span>&#9660;</span>}
      </div>
      <div className={`${style.listWrapper} ${hendlerContainer ? maxHeightClass : style.closeHeighContainer}`}>
        <div
          className={hendlerContainer ? style.showChildren : style.hideChildren}
        >
          { children }
        </div>
      </div>
    </div>
  );
};
