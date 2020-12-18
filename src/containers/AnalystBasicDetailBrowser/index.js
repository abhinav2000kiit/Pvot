import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import './BasicDetails.scss';
import * as actions from '../../redux/actions/index';
import AccountDetailsEdit from '../AnalystAccountDetailsBrowser/AccountDetailsEdit';
import AccountDetailsDisplay from '../AnalystAccountDetailsBrowser/AccountDetailsDisplay';
import BasicDetailEdit from './BasicDetailEdit';
import BasicDetailDisplay from './BasicDetailDisplay';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: '#565EBF'
    }
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#2B2B2B',
    textAlign: 'right',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1
    }
  }
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabpanel: {
    width: '40rem'
  },
  formControl: {
    margin: theme.spacing(0),
    fontSize: 16,
    outlineWidth: 0,
    minWidth: 120
  },
  label: {
    margin: theme.spacing(0),
    fontSize: 10,
    fontWeight: 'bolder'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 50
  },
  button: {
    width: 224,
    textTransform: 'none',
    fontWeight: 'normal'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const BasicDetail = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [detailsPageEdit, setDetailsPageEdit] = React.useState(true);
  const [accountPageEdit, setAccountPageEdit] = React.useState(true);
  const { signinData, analystDetails, bankAccountDetails } = props;

  React.useEffect(() => {
    const signinDataName =
      signinData && signinData.user && signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
        ? signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value === ' '
          ? null
          : signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value
        : null;
    const signinDataEmail =
      signinData && signinData.user && signinData.user.UserAttributes.filter(item => item.Name === 'email').length > 0
        ? signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value === ' '
          ? null
          : signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value
        : null;
    const signinPhone =
      signinData &&
      signinData.user &&
      signinData.user.UserAttributes.filter(item => item.Name === 'phone_number').length > 0
        ? signinData.user.UserAttributes.filter(item => item.Name === 'phone_number')[0].Value === ' '
          ? null
          : signinData.user.UserAttributes.filter(item => item.Name === 'phone_number')[0].Value
        : null;
    const tradingExp = analystDetails && analystDetails.trading_experience >= 0;
    const education = analystDetails && analystDetails.education;

    const bankDetailsComplete =
      bankAccountDetails &&
      bankAccountDetails.bank &&
      bankAccountDetails.bank.name &&
      bankAccountDetails.ifsc_code &&
      bankAccountDetails.name &&
      bankAccountDetails.number
        ? true
        : false;

    console.log(signinDataName, signinDataEmail, signinPhone, tradingExp, education);

    if (signinDataName && signinPhone && tradingExp && education) {
      props.setProfileDisplayPage(true);
    }
    if (bankDetailsComplete) {
      props.setAccountDisplayPage(true);
    }
  }, [signinData, analystDetails]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  console.log('@@@@@@@@@@@@@', props, detailsPageEdit, accountPageEdit);

  return (
    <div>
      <div className={classes.root}>
        <StyledTabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          className={classes.tabs}
          style={{ textAlign: 'right' }}
        >
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 0 ? '#565EBF' : '#2B2B2B',
              textTransform: 'none'
            }}
            label='PERSONAL DETAILS'
            {...a11yProps(0)}
          />
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 1 ? '#565EBF' : '#2B2B2B',
              textTransform: 'none'
            }}
            label='BANK ACCOUNT'
            {...a11yProps(1)}
          />
        </StyledTabs>
        <TabPanel value={value} index={0} className={classes.tabpanel}>
          {props.switchToProfileDisplay ? <BasicDetailDisplay /> : <BasicDetailEdit />}
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tabpanel}>
          {props.switchToAccountDisplay ? <AccountDetailsDisplay /> : <AccountDetailsEdit />}
          {/* <AccountDetailsEdit /> */}
        </TabPanel>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  analystDetails: state.analyst.analystDetails,
  bankAccountDetails: state.auth.bankAccountDetails,
  switchToProfileDisplay: state.analyst.switchToProfileDisplay,
  switchToAccountDisplay: state.analyst.switchToAccountDisplay
});

const mapDispatchToProps = dispatch => ({
  setProfileDisplayPage: param => dispatch(actions.setProfileDisplayPage(param)),
  setAccountDisplayPage: param => dispatch(actions.setAccountDisplayPage(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetail);
