import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBack from '@material-ui/icons/KeyboardBackspaceSharp';
import ShareIcon from '@material-ui/icons/Share';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Image } from 'react-bootstrap';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

const ElevateAppBar = props => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  console.log(`props: `, props);
  return (
    <React.Fragment >
      <CssBaseline />
      <ElevationScroll {...props}>
        <div style={{ backgroundColor: 'transparent', color: '#2962ff' }}>
          <div>

            {props.filter && props.filter === true ? (
              <FilterListIcon style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => props.setOpen(true)} />
            ) : props.shareButton && props.shareButton === true ? (
              <div onClick={props.shareClick && props.shareClick}>
                <ShareIcon />
              </div>
            ) : (
              <>
                {props.addTrade && props.addTrade === true ? (
                  <>
                    <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                      <RefreshIcon
                        style={{ marginRight: '2rem', cursor: 'pointer' }}
                        onClick={() => props.refreshData(true)}
                      />
                      <AddIcon style={{ marginLeft: '2rem', cursor: 'pointer' }} onClick={() => props.setOpen(true)} />
                    </div>
                  </>
                ) : (
                  <div style={{ visibility: 'hidden' }}>asd</div>
                )}
              </>
            )}
          </div>
        </div>
      </ElevationScroll>
      <Toolbar />
      <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
        {/* <DialogTitle id="simple-dialog-title">Delete My Account</DialogTitle> */}
        <DialogContent>Changes Not Saved. Do you want to go back?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              props.history.goBack();
            }}
            color='primary'
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default withRouter(ElevateAppBar);
