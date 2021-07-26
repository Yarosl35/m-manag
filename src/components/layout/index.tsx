import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import { TopBar } from './TopBar';

interface Props{}

const useStyleLayout = makeStyles({
  styleMainBlock: {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export const Layout: FC<Props> = ({ children }) => {
  const style = useStyleLayout();
  return (
    <div className={style.styleMainBlock}>
      <TopBar />
      {children}
    </div>
  );
};
