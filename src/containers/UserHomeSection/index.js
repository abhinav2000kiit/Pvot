import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Header from '../components/Header/customHeader';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import BottomNavigation from '../components/BottomNavigator';
import Feed from '../Feed/Feed';

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,

      '& .makeStyles-commonContainer-178': {
        display: 'none'
      },
      '& .makeStyles-commonContainer-46': {
        marginRight: '0.25rem',
        paddingLeft: '0px',
        paddingRight: '0px'
      }
    },
    progressTime: {
    }
  };
});

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

const Home = props => {
  const classes = useStyles();
  const [openFilter, setOpenFilter] = React.useState(false);

  const [segmentFilter, setSegmentFilter] = React.useState({
    options: true,
    equity: true,
    investments: true,
    futures: true
  });

  const handleChangeSegmentFilter = event => {
    setSegmentFilter({ ...segmentFilter, [event.target.name]: event.target.checked });
  };

  const [tradeTypeFilter, setTradeTypeFilter] = React.useState({
    intraday: true,
    positional: true
  });

  const handleChangeTradeFilter = event => {
    setTradeTypeFilter({ ...tradeTypeFilter, [event.target.name]: event.target.checked });
  };

  return (
    <div className='bg-light'>
      <Drawer
        anchor='bottom'
        open={openFilter}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div style={{ height: '100%' }}>
          <div style={{ backgroundColor: '#fafafa', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setOpenFilter(false)} />
            </div>
            <div style={{ marginTop: '2px' }}>
              {/* <> Filters Coming Soon! </> */}

              <p style={{ color: '#bdbdbd', marginBottom: '2px' }}>Filter based on Segment</p>

              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={segmentFilter.options}
                      onChange={handleChangeSegmentFilter}
                      name='options'
                      color='primary'
                    />
                  }
                  label='Options'
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={segmentFilter.equity}
                      onChange={handleChangeSegmentFilter}
                      name='equity'
                      color='primary'
                    />
                  }
                  label='Equity'
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={segmentFilter.investments}
                      onChange={handleChangeSegmentFilter}
                      name='investments'
                      color='primary'
                    />
                  }
                  label='Investments'
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={segmentFilter.futures}
                      onChange={handleChangeSegmentFilter}
                      name='futures'
                      color='primary'
                    />
                  }
                  label='Futures'
                />
              </FormGroup>

              <p style={{ color: '#bdbdbd', marginBottom: '2px' }}>Filter based on Trade Type</p>

              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tradeTypeFilter.intraday}
                      onChange={handleChangeTradeFilter}
                      name='intraday'
                      color='primary'
                    />
                  }
                  label='Intraday'
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tradeTypeFilter.positional}
                      onChange={handleChangeTradeFilter}
                      name='positional'
                      color='primary'
                    />
                  }
                  label='Positional'
                />
              </FormGroup>
            </div>
          </div>
        </div>
      </Drawer>

      <Header title={'Feed'} filter={true} setOpen={setOpenFilter} />

      <div style={{ marginBottom: '40px' }}>
        <div style={{ padding: '5px', width: '100%' }}>
          {/* Actual Feed */}
          <Feed segmentFilter={segmentFilter} tradeTypeFilter={tradeTypeFilter} />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Home;
