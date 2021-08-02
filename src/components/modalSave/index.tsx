import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useEffect } from 'react';
import { Loader } from '../loader/Loader';

const styles = makeStyles((theme: Theme) => createStyles({
  loader: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '15px',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
interface PropsModal {
    loading : boolean
    open: boolean
    handleModal: (value: boolean)=>void
}
export const TransitionsModal: FC<PropsModal> = ({ open, loading, handleModal }) => {
  const style = styles();
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        handleModal(false);
      }, 3000);
    }
  }, [loading]);
  return (
    <div>
      {loading ? (<div className={style.loader}><Loader /></div>) : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={style.modal}
          open={open}
          onClose={() => handleModal(true)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >

          <Fade in={open}>
            <div className={style.paper}><h2 id="transition-modal-title">saved</h2></div>
          </Fade>

        </Modal>
      )}
    </div>
  );
};
