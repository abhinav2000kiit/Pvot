import React from 'react';
import Header from '../components/Header/customHeader';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
//import VirtualTradeItem from '../components/VirtualTradeItem/User'
import PropTypes from 'prop-types';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const amount = props => {
  return props.history.location.state && props.history.location.state.amount;
};

const Payment = props => {
  const [value, setValue] = React.useState(0);

  const handleTabStateChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valueRadio, setValueRadio] = React.useState('1');
  const handleChangeRadioPay = event => {
    setValueRadio(event.target.value);
  };
  const [valueRadioDebit, setValueRadioDebit] = React.useState(null);
  const handleChangeRadioDebit = event => {
    setValueRadioDebit(event.target.value);
  };
  const [valueRadioCredit, setValueRadioCredit] = React.useState(null);
  const handleChangeRadioCredit = event => {
    setValueRadioCredit(event.target.value);
  };

  React.useEffect(() => {
    props.fetchUserCards();
  }, []);

  console.log('props in Userpayment', props);

  return (
    <>
      <div style={{ backgroundColor: '#fff' }}>
        <Header title='Payment' />
        <AppBar position='static' style={{ padding: '20px', backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Tabs
            value={value}
            variant='fullWidth'
            indicatorColor='none'
            onChange={handleTabStateChange}
            aria-label='simple tabs example'
          >
            <Tab
              label='Wallet'
              {...a11yProps(0)}
              icon={<AccountBalanceWalletIcon />}
              style={{
                border: value !== 0 ? '1px solid #bdbdbd' : '',
                backgroundColor: value === 0 ? '#fff' : '#fafafa',
                color: '#212121',
                textTransform: 'none'
              }}
            />
            <Tab
              label='Debit'
              {...a11yProps(1)}
              icon={<CreditCardIcon />}
              style={{
                border: value !== 1 ? '1px solid #bdbdbd' : '',
                backgroundColor: value === 1 ? '#fff' : '#fafafa',
                color: '#212121',
                textTransform: 'none'
              }}
            />
            <Tab
              label='Credit'
              {...a11yProps(2)}
              icon={<CreditCardIcon />}
              style={{
                border: value !== 2 ? '1px solid #bdbdbd' : '',
                backgroundColor: value === 2 ? '#fff' : '#fafafa',
                color: '#212121',
                textTransform: 'none'
              }}
            />
          </Tabs>
        </AppBar>
        <TabPanel className='tabs' value={value} index={0} style={{ padding: '30px' }}>
          <FormControl>
            <RadioGroup aria-label='payment' name='payment' value={valueRadio} onChange={handleChangeRadioPay}>
              <div>
                <FormControlLabel value='1' className='custom-radio' control={<Radio style={{ color: '#2962ff' }} />} />
                <Image src={require('../../assets/images/paytm.png')} style={{ height: '20px' }} />
                {valueRadio === '1' ? (
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ width: '200px', width: '200px', margin: '20px', borderRadius: 'unset' }}
                  >
                    Pay ₹{amount(props)}
                  </Button>
                ) : null}
              </div>
              <div>
                <FormControlLabel value='2' className='custom-radio' control={<Radio style={{ color: '#2962ff' }} />} />
                <Image src={require('../../assets/images/phonepe.jpg')} style={{ height: '20px' }} />
                {valueRadio === '2' ? (
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ width: '200px', width: '200px', margin: '20px', borderRadius: 'unset' }}
                  >
                    Pay ₹{amount(props)}
                  </Button>
                ) : null}
              </div>
              <div>
                <FormControlLabel value='3' className='custom-radio' control={<Radio style={{ color: '#2962ff' }} />} />
                <Image src={require('../../assets/images/amazonpay.png')} style={{ height: '20px' }} />
                {valueRadio === '3' ? (
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ width: '200px', width: '200px', margin: '20px', borderRadius: 'unset' }}
                  >
                    Pay ₹{amount(props)}
                  </Button>
                ) : null}
              </div>
              <div>
                <FormControlLabel value='4' className='custom-radio' control={<Radio style={{ color: '#2962ff' }} />} />
                <Image src={require('../../assets/images/freecharge.png')} style={{ height: '20px' }} />
                {valueRadio === '4' ? (
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ width: '200px', width: '200px', margin: '20px', borderRadius: 'unset' }}
                  >
                    Pay ₹{amount(props)}
                  </Button>
                ) : null}
              </div>
              {/* <FormControlLabel value="2" control={<Radio style={{color:'#2962ff'}} />} />
                            <FormControlLabel value="3" control={<Radio style={{color:'#2962ff'}} />} />
                            <FormControlLabel value="4" control={<Radio style={{color:'#2962ff'}} />} /> */}
            </RadioGroup>
          </FormControl>
        </TabPanel>
        <TabPanel className='tabs' value={value} index={1} style={{ padding: '30px' }}>
          {props.savedCards && props.savedCards.debit_cards && props.savedCards.debit_cards.length > 0 ? (
            <div style={{ padding: '20', color: '#212121' }}>
              <div style={{ margin: '20px', textAlign: 'center' }}>
                <strong>Choose A Debit Card</strong>
              </div>
              <FormControl>
                <RadioGroup
                  aria-label='gender'
                  name='gender1'
                  value={valueRadioDebit}
                  onChange={handleChangeRadioDebit}
                >
                  {props.savedCards.debit_cards.map(c => (
                    <Card valueRadio={valueRadioDebit} data={c} history={props.history} />
                  ))}
                </RadioGroup>
              </FormControl>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to='/user/card-details'>Add More Cards</Link>
              </div>
            </div>
          ) : (
            <div style={{ padding: '20', textAlign: 'center', color: '#616161' }}>
              <span style={{ display: 'block' }}>No cards found.</span>
              <Link to='/user/card-details'>Add cards</Link>
            </div>
          )}
        </TabPanel>
        <TabPanel className='tabs' value={value} index={2} style={{ padding: '30px' }}>
          {props.savedCards && props.savedCards.credit_cards && props.savedCards.credit_cards.length > 0 ? (
            <div style={{ padding: '20', color: '#212121' }}>
              <div style={{ margin: '20px', textAlign: 'center' }}>
                <strong>Choose A Credit Card</strong>
              </div>
              <FormControl>
                <RadioGroup
                  aria-label='gender'
                  name='gender1'
                  value={valueRadioCredit}
                  onChange={handleChangeRadioCredit}
                >
                  {props.savedCards.credit_cards.map(c => (
                    <Card valueRadio={valueRadioCredit} data={c} history={props.history} />
                  ))}
                </RadioGroup>
              </FormControl>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to='/user/card-details'>Add More Cards</Link>
              </div>
            </div>
          ) : (
            <div style={{ padding: '20', textAlign: 'center', color: '#616161' }}>
              <span style={{ display: 'block' }}>No cards found.</span>
              <Link to='/user/card-details'>Add cards</Link>
            </div>
          )}
        </TabPanel>
      </div>
    </>
  );
};

const Card = props => {
  return (
    <>
      <div>
        <FormControlLabel
          value={props.data.card_number}
          className='custom-radio'
          control={<Radio style={{ color: '#2962ff' }} />}
        />
        <span style={{ height: '20px' }}>
          {props.data.card_number.slice(0, 2)}** - **** - **** - **
          {props.data.card_number.slice(props.data.card_number.length - 2, props.data.card_number.length)}
        </span>
        {props.valueRadio === props.data.card_number ? (
          <Button
            variant='contained'
            color='primary'
            style={{ width: '200px', width: '200px', margin: '20px', borderRadius: 'unset' }}
          >
            Pay ₹{amount(props)}
          </Button>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  savedCards: state.user.savedCards
});

const mapDispatchToProps = dispatch => ({
  fetchUserCards: params => dispatch(actions.fetchUserCards(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
