import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import CircularProgress from '@material-ui/core/CircularProgress';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Popover from '@material-ui/core/Popover';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment-timezone';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 'unset!important'
  },
  typography: {
    padding: 10
  }
}));
//import Typography from '@material-ui/core/Typography';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    overflow: 'auto'
  }
}))(MuiExpansionPanelDetails);

const AnalystBrowseItem = props => {
  console.log(`props in Analyst Cards: `, props);
  const { data, tabValue, signinData, idx, expanded, setExpanded } = props;

  const [followed, setFollowed] = React.useState(data && data.followed ? data.followed : false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [shouldGo, setShouldGo] = React.useState(false);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const toggleFollowed = () => {
    setFollowed(!followed);
  };

  React.useEffect(() => {
    setFollowed(data && data.followed ? data.followed : false);
  }, [data]);

  React.useEffect(() => {
    props.setAnalystSubscriptionPlan(null);
    props.setPaymentSubscriptionLink(null);
    setShouldGo(true);
  }, []);
  React.useEffect(() => {
    if (props.analystSubscriptionPlanList) {
      props.setAnalystSubscriptionPlan(null);
    }
  }, [tabValue]);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeRadio = event => {
    setValue(parseInt(event.target.value));
  };

  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  console.log(
    props.analystSubscriptionPlanList &&
      props.analystSubscriptionPlanList.length > 0 &&
      moment(props.analystSubscriptionPlanList[value].from_date)
        .zone('+05:30')
        .format('DD/MM/YYYY')
  );
  if (props.paymentLinkForSubscription && shouldGo) {
    window.location.href = props.paymentLinkForSubscription.payment_link;
  }

  const follow = id => {
    console.log(followed);
    if (followed) {
      console.log('unfollow follow ' + id);
      props.unFollowAnalyst(id);
      toggleFollowed();
    } else {
      console.log('follow ' + id);
      props.followAnalyst(id);
      toggleFollowed();
    }
  };
  return (
    <>
      <ExpansionPanel
        style={{ margin: '10px 5px' }}
        className='custom-expansion'
        expanded={expanded === `panel__${idx}_${data.analyst_info.user.user_id}_${tabValue}`}
        onChange={handleChange(`panel__${idx}_${data.analyst_info.user.user_id}_${tabValue}`)}
        square
      >
        <ExpansionPanelSummary
          aria-controls={`panel__${idx}_${data.analyst_info.user.user_id}_${tabValue}d-content`}
          id={`panel_${idx}_${data.analyst_info.user.user_id}_${tabValue}d-header`}
          onClick={() => {
            props.getAnalystSubscriptionPlan({
              token: signinData.token.AuthenticationResult.AccessToken,
              refreshToken: signinData.token.AuthenticationResult.RefreshToken,
              analyst_id: data.analyst_info.user.user_id,
              trade_type: data.trade_type,
              segment:
                tabValue === 0 ? 'EQUITY' : tabValue === 1 ? 'OPTIONS' : tabValue === 2 ? 'FUTURES' : 'INVESTMENT'
            });
          }}
        >
          <div style={{ position: 'relative', margin: '0px', width: '100%', padding: '10px', backgroundColor: '#fff' }}>
            <ExpandMoreIcon
              style={{
                position: 'absolute',
                fontSize: '18px',
                color: '#2962ff',
                top: '5px',
                right: '5px',
                cursor: 'pointer'
              }}
            />
            <Row style={{ display: 'grid', gridTemplateColumns: '25% 50% 25%', alignItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  src={
                    data.analyst_info && data.analyst_info.profile_picture
                      ? data.analyst_info.profile_picture
                      : require('../../../assets/images/jpeg/placeholder.jpg')
                  }
                  roundedCircle
                  style={{ height: '50px', width: '50px' }}
                  onClick={event => {
                    event.stopPropagation();
                    props.history.push({
                      pathname: '/user/view-analyst-profile',
                      state: {
                        data,
                        segment:
                          tabValue === 0
                            ? 'EQUITY'
                            : tabValue === 1
                            ? 'OPTIONS'
                            : tabValue === 2
                            ? 'FUTURES'
                            : 'INVESTMENT'
                      }
                    });
                  }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {data.analyst_info.sebi_registered === true ? (
                    <span style={{ color: '#bdbdbd', fontSize: '12px' }}>
                      <Image
                        src={require('../../../assets/images/SEBI_logo.png')}
                        style={{ height: '15px', width: '15px' }}
                      />
                      &nbsp;| &nbsp;
                    </span>
                  ) : data.analyst_info.nism_registered ? (
                    <span style={{ color: '#bdbdbd', fontSize: '12px' }}>
                      <Image src={require('../../../assets/images/NISM-logo.png')} style={{ height: '15px' }} />
                      &nbsp;| &nbsp;
                    </span>
                  ) : null}
                  <span style={{ color: '#000000', fontSize: '12px' }}>
                    {data.segment.name !== 'INVESTMENT' ? data.segment.name : null}
                  </span>
                </div>
                <div>
                  <p className='small'></p>
                  <Typography
                    variant='h6'
                    onClick={event => {
                      event.stopPropagation();
                      props.history.push({
                        pathname: '/user/view-analyst-profile',
                        state: {
                          data,
                          segment:
                            tabValue === 0
                              ? 'EQUITY'
                              : tabValue === 1
                              ? 'OPTIONS'
                              : tabValue === 2
                              ? 'FUTURES'
                              : 'INVESTMENT'
                        }
                      });
                    }}
                  >
                    {data.analyst_info.user.name}
                  </Typography>
                </div>
                <div>
                  <Button
                    variant='outlined'
                    style={{
                      height: '30px',
                      textTransform: 'none',
                      padding: '2px',
                      backgroundColor: '#2962ff',
                      color: 'white',
                      width: '100px',
                      borderColor: '#2962ff'
                    }}
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    fontSize: '18px',
                    fontWeight: '600',
                    // color: 'white',
                    // backgroundColor: data.percentage_returns > 0 ? '#00e676' : '#f091a2',
                    color: data.percentage_returns > 0 ? '#00e676' : '#ff1744',
                    borderRadius: '50%',
                    display: 'flex',
                    margin: '5px auto 0px',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {data.percentage_returns.toFixed(1)}%
                </div>
                <div style={{ fontSize: '12px', color: '#616161' }}>Absolute Returns</div>
              </div>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{ width: '95%', borderBottom: '1px solid #eeeeee', marginTop: '15px', marginBottom: '15px' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '25% 25% 25% 25%' }}>
              <div style={{ textAlign: 'center', padding: '5px', borderRight: '1px solid rgb(238, 238, 238)' }}>
                <p style={{ color: '#616161', fontSize: '12px', marginBottom: '3px' }}>Min. Capital</p>
                <p style={{ color: '#212121', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
                  ₹{data.capital_required.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                {/* <p>asdas</p> */}
              </div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '5px',
                  borderRight: '1px solid rgb(238, 238, 238)',
                  paddingRight: '5px'
                }}
              >
                <p style={{ color: '#616161', fontSize: '12px', marginBottom: '3px' }}>Max Drawdown</p>
                <p style={{ color: '#ff1744', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
                  {data.max_draw_down.toFixed(1)}%
                </p>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '5px',
                  borderRight: '1px solid rgb(238, 238, 238)',
                  paddingRight: '5px'
                }}
              >
                <p style={{ color: '#616161', fontSize: '12px', marginBottom: '3px' }}>Capital/Trade</p>
                <p style={{ color: '#212121', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
                  ₹ {(~~data.capital_trade).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px' }}>
                <p style={{ color: '#616161', fontSize: '8px', marginBottom: '3px' }}>
                  {followed ? (
                    <CheckCircleIcon
                      style={{
                        height: '30px',
                        textTransform: 'none',
                        padding: '2px',
                        color: 'green',
                        width: '100px',
                        borderColor: '#2962ff'
                      }}
                      onClick={event => {
                        event.stopPropagation();
                        follow(data.analyst_info.user.user_id);
                      }}
                    />
                  ) : (
                    <PersonAddIcon
                      style={{
                        height: '30px',
                        textTransform: 'none',
                        padding: '2px',
                        color: '#2962ff',
                        width: '100px',
                        borderColor: '#2962ff'
                      }}
                      onClick={event => {
                        event.stopPropagation();
                        follow(data.analyst_info.user.user_id);
                      }}
                    />
                  )}

                  {/* <Button
                    variant='outlined'
                    style={{
                      height: '30px',
                      textTransform: 'none',
                      padding: '2px',
                      color: '#2962ff',
                      width: '100px',
                      borderColor: '#2962ff'
                    }}
                    onClick={event => {
                      event.stopPropagation();
                      follow(data.analyst_info.user.user_id)
                    }}
                  >
                    {followed === true ? 'Unfollow' : 'Follow'}
                  </Button> */}
                  {/* <span
                    style={{ color: 'rgb(41, 98, 255)', textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={event => {
                      event.stopPropagation();
                      props.history.push({
                        pathname: '/user/view-analyst-profile',
                        state: {
                          data,
                          segment:
                            tabValue === 0
                              ? 'EQUITY'
                              : tabValue === 1
                              ? 'OPTIONS'
                              : tabValue === 2
                              ? 'FUTURES'
                              : 'INVESTMENT'
                        }
                      });
                    }}
                  >
                    Details
                  </span> */}
                </p>
              </div>
            </div>
            {/* <small className="form-text text-muted mt-2 text-right"> Since : {moment(data.updated_date).format("MMMM YYYY")}</small> */}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ borderBottom: '1px solid rgba(0, 0, 0, .125)' }}>
          {props.analystSubscriptionPlanList ? (
            <>
              <div>
                <Typography variant='caption' style={{ color: '#23374d' }}>
                  Select a Subscription Plan
                </Typography>
              </div>
              {/* <div
                style={{
                  padding: '13px',
                  margin: '20px',
                  border: '1px solid #2962ff',
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleClick}
              >
                <CardGiftcardIcon style={{ color: '#2962ff', alignItems: 'center' }} />
                &nbsp; &nbsp;
                <Typography variant='subtitle2' style={{ color: '#2962ff', alignItems: 'center', alignSelf: 'center' }}>
                  Click to Avail 3 days free trial
                </Typography>
              </div> */}
              {props.analystSubscriptionPlanList.length < 1 ? (
                <Typography variant='caption' style={{ color: '#23374d' }}>
                  No Subscription plans yet!
                </Typography>
              ) : (
                <>
                  <div>
                    <FormControl className={classes.formControl}>
                      <RadioGroup aria-label='gender' name='gender1' value={value} onChange={handleChangeRadio}>
                        {props.analystSubscriptionPlanList &&
                          props.analystSubscriptionPlanList
                            .filter(item => !(item.amount > data.analyst_info.capital_required))
                            .map((item, index) => (
                              <FormControlLabel
                                value={index}
                                control={<Radio style={{ color: '#2962ff' }} />}
                                label={
                                  item.script
                                    ? `₹${item.amount} | ${
                                        item.days === 1
                                          ? '1 Day'
                                          : item.days === 7
                                          ? ' 1 Week'
                                          : item.days === 30
                                          ? '1 Month'
                                          : `${item.days / 30} Months`
                                      }  | ${item.trade_type} | ${item.script}`
                                    : `₹${item.amount} | ${
                                        item.days === 1
                                          ? '1 Day'
                                          : item.days === 7
                                          ? ' 1 Week'
                                          : item.days === 30
                                          ? '1 Month'
                                          : `${item.days / 30} Months`
                                      }  | ${item.trade_type}`
                                }
                              />
                            ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <Button
                    variant='contained'
                    fullWidth
                    style={{ textTransform: 'none', height: '40px', backgroundColor: '#2962ff', color: '#fff' }}
                    onClick={() => {
                      var formData = new FormData();
                      formData.append('plan_id', props.analystSubscriptionPlanList[value].plan_id);
                      formData.append(
                        'start_date',
                        moment(props.analystSubscriptionPlanList[value].from_date)
                          .add(5, 'Hours')
                          .add(30, 'Minutes')
                          .format('DD/MM/YYYY')
                      );
                      formData.append(
                        'end_date',
                        moment(props.analystSubscriptionPlanList[value].to_date)
                          .add(5, 'Hours')
                          .add(30, 'Minutes')
                          .format('DD/MM/YYYY')
                      );
                      props.getPaymentSubscriptionLink({
                        token: signinData.token.AuthenticationResult.AccessToken,
                        data: formData
                        // {
                        //   plan_id: props.analystSubscriptionPlanList[value].plan_id,
                        //   start_date: moment(props.analystSubscriptionPlanList[value].from_date).format('DD/MM/YYYY'),
                        //   end_date: moment(props.analystSubscriptionPlanList[value].to_date).format('DD/MM/YYYY')
                        // }
                      });
                    }}
                  >
                    Proceed To Pay
                  </Button>
                </>
              )}
            </>
          ) : (
            <div className='center-col'>
              <CircularProgress name='circle' color='primary' />
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Row>
          <Typography className={classes.typography} style={{ fontSize: '13px', padding: '10px' }}>
            Are you sure you want to start free trial? You can take one more free trial after this one.
          </Typography>
        </Row>
        <Row style={{ padding: '5px', justifyContent: 'flex-end', margin: '0px' }}>
          <Button onClick={handleClosePopover}>Cancel</Button>
          <Button onClick={handleClosePopover} style={{ color: '#2962ff' }}>
            Yes
          </Button>
        </Row>
      </Popover> */}
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  analystSubscriptionPlanList: state.user.analystSubscriptionPlanList,
  paymentLinkForSubscription: state.user.paymentLinkForSubscription
});

const mapDispatchToProps = dispatch => ({
  getAnalystSubscriptionPlan: payload => dispatch(actions.getAnalystSubscriptionPlan(payload)),
  setAnalystSubscriptionPlan: payload => dispatch(actions.setAnalystSubscriptionPlan(payload)),
  getPaymentSubscriptionLink: payload => dispatch(actions.getPaymentSubscriptionLink(payload)),
  setPaymentSubscriptionLink: payload => dispatch(actions.setPaymentSubscriptionLink(payload)),
  followAnalyst: payload => dispatch(actions.submitUserFollow(payload)),
  unFollowAnalyst: payload => dispatch(actions.submitUserUnFollow(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnalystBrowseItem));
