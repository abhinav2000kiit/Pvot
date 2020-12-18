import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { connect } from 'react-redux';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import * as actions from '../../../redux/actions/index';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
   fontSize:"10px"
  },
});

const BottomNavigator = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.homeState);
  const handleChange = (event, value) => {
    props.changeHomeState(value);

    if (props.userGroup === 'ANALYST') {
      props.history.push('/analyst-home');
    } else {
      props.history.goBack();
    }
  };

  return (
    <>
    { props.userGroup === 'ANALYST' ? 
      <BottomNavigation value={value} onChange={handleChange} className={classes.root} showLabels>
      <BottomNavigationAction
        value={0}
        label='Dashboard'
        disableTouchRipple={true}
        icon={<AssessmentOutlinedIcon style={{ color: value === 0 ? blue[500] : grey[500] }} fontSize='medium' />}
      />
      <BottomNavigationAction
        value={1}
        label='Trades'
        disableTouchRipple={true}
        icon={<ShowChartIcon style={{ color: value === 1 ? blue[500] : grey[500] }} fontSize='medium' />}
      />
      <BottomNavigationAction
        value={2}
        label='Notifications'
        disableTouchRipple={true}
        icon={
          <NotificationsNoneOutlinedIcon style={{ color: value === 2 ? blue[500] : grey[500] }} fontSize='medium' />
        }
      />
      <BottomNavigationAction
        value={3}
        label='More'
        disableTouchRipple={true}
        icon={<DehazeIcon style={{ color: value === 3 ? blue[500] : grey[500] }} fontSize='medium' />}
      />
    </BottomNavigation> 
    :
    <BottomNavigation value={value} onChange={handleChange} className={classes.root} showLabels>
          <BottomNavigationAction
            value={0}
            label='Home'
            disableTouchRipple={true}
            icon={<HomeOutlinedIcon style={{ color: value === 0 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
          <BottomNavigationAction
            value={1}
            label='Experts'
            disableTouchRipple={true}
            icon={<PeopleOutlinedIcon style={{ color: value === 1 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
          <BottomNavigationAction
            value={2}
            label='Subscriptions'
            disableTouchRipple={true}
            icon={<DynamicFeedIcon style={{ color: value === 2 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
          <BottomNavigationAction
            value={3}
            label='Notifications'
            disableTouchRipple={true}
            icon={<NotificationsNoneOutlinedIcon style={{ color: value === 3 ? blue[500] : grey[500] }} />}
          />
          <BottomNavigationAction
            value={4}
            label='More'
            disableTouchRipple={true}
            icon={<DehazeIcon style={{ color: value === 4? blue[500] : grey[500] }} fontSize='medium' />}
          />
        </BottomNavigation>  
    }
    </>
  );
};

const mapStateToProps = state => ({
  homeState: state.auth.homeState,
  analystDetails: state.analyst.analystDetails,
  userGroup: state.auth.userGroup
});

const mapDispatchToProps = dispatch => ({
  changeHomeState: params => dispatch(actions.changeHomeState(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BottomNavigator));
