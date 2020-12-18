import React from 'react';
import Header from '../components/Header/customHeader';
import Notification from '../components/Notification';
import Slide from '@material-ui/core/Slide';

const Notifications = props => {
  let notifications = JSON.parse(localStorage.getItem('notifications'));
  console.log(notifications);
  return (
    <>
      <Slide direction='left' in={true} mountOnEnter unmountOnExit>
        <div>
          <Header title='Notifications' />

          {notifications !== null ? (
            <>
              {notifications.map((n, idx) => (
                <Notification key={idx} data={n} />
              ))}
            </>
          ) : (
            <div className='row'>
              <div className='col'>
                <img
                  src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                  className='user-on-board-image'
                />
              </div>
            </div>
          )}
        </div>
      </Slide>
    </>
  );
};

export default Notifications;
