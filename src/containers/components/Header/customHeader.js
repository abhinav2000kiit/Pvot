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
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Row,Col,Image } from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import Grow from '@material-ui/core/Grow';
import { TextField } from '@material-ui/core'

import { Mixpanel } from '../../../shared/mixPanel'

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
  const [openSearchBar, setOpenSearchBar] = React.useState(false)
  const handleSearchClose = () => {
    props.onSearchClose()
    setOpenSearchBar(false)
  }
  // console.log(`props: `, props);
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar style={{ backgroundColor: '#fff', color: '#2962ff' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            {props.backButton && props.backButton === true ? (
              // <div onClick={props.backTo ? props.backTo : '/'}>
              <IconButton color='primary' onClick={props.history.goBack}>
                <KeyboardBack />
              </IconButton>
            ) : props.refresh && props.refresh === true ? (
              <IconButton
                style={{ marginRight: '10px', cursor: 'pointer' }}
                color='primary'
                onClick={() => {
                  Mixpanel.track('Refresh button clicked - Expert');
                  props.refreshData(true)}}
              >
                <RefreshIcon style={{ marginRight: '10px', cursor: 'pointer' }} />
              </IconButton>
            ) : (
              <div
                style={{ visibility: props.infoDrawer ? 'visible' : 'hidden' }}
                onClick={props.infoDrawer ? () => props.setOpenInfo(true) : null}
              >
                <Image src={require('../../../assets/icons/svg/info-icon.svg')} width='28px' />
              </div>
            )}

            {props.location.pathname === '/notifications' && (
              <IconButton
                color='black'
                onClick={() => {
                  if (props.location.pathname === '/notifications') {
                    props.history.push('/');
                  } else {
                    if (props.someValueChanged && props.someValueChanged === true) {
                      setOpen(true);
                    } else {
                      props.history.goBack();
                    }
                  }
                }}
              >
                <KeyboardBack />
              </IconButton>
            )}

            <Typography variant='h6' style={{ fontSize: '16px' }}>
              {props.title}
            </Typography>

            {props.filter && props.filter === true ? (
              <div>
                {props.searchIcon ?
                  <SearchIcon style={{color:'#2962ff'}} onClick={() =>{Mixpanel.track('Search Clicked - Investor'); setOpenSearchBar(true)}} color='primary' />
                : null}
                <FilterListIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => {Mixpanel.track('Filter Clicked - Investor');props.setOpen(true)}} />
              </div>
            ) : props.shareButton && props.shareButton === true ? (
              <div onClick={props.shareClick}>
                <ShareIcon />
              </div>
            ) : props.addTrade && props.addTrade === true ? (
              // <IconButton color='primary' onClick={() => props.history.push('/new-trade')}>
              //   {/* <AddIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => props.setOpen(true)} />{' '} */}
              //   <AddIcon style={{ marginLeft: '10px', cursor: 'pointer' }} />
              // </IconButton>
              <Chip
                label='New Trade'
                clickable
                onClick={() => props.history.push('/new-trade')}
                icon={<AddCircleOutlineIcon style={{ color: '#fff' }} />}
                size='small'
                variant='default'
                style={{ backgroundColor: '#2962ff', color: '#fff' }}
              />
            ) : props.crossIcon && props.crossIcon === true ? (
              <IconButton color='primary' onClick={props.history.goBack}>
                <CloseIcon style={{ marginLeft: '10px', cursor: 'pointer' }} />
              </IconButton>
            ) : (
              <div style={{ visibility: 'hidden' }}>asd</div>
            )}
            {props.searchIcon ? <Grow in={openSearchBar} out={!openSearchBar} timeout={300}>
          <Row className='center-row'
          style={{
            position:'fixed',
            top: '0',
            left: 0,
            right: 0,
            boxShadow: '0 0 4px grey',
            backgroundColor:'white',
            color:"white"
            // color:'white',
            // borderBottom:'1px solid black',
          }}>
          <div className='pl-2'>
            <KeyboardBack color='primary'
              onClick={handleSearchClose}
            />
          </div>
          <Col>
            <input 
              onFocus={openSearchBar}
              className='py-2'
              value={props.searchValue}
              onChange={props.onSearchChange}
              placeholder='Search Expert'
              style={{
                height:'50px',
                paddingLeft:'12px',
                width:'100%',
                // color:'white',
                backgroundColor:'transparent'
              }}
             />
          </Col>
          
        </Row>
      </Grow>:null}
          </Toolbar>
        </AppBar>
        
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
