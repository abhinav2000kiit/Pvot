import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import waiting from '../../assets/gifs/waiting.gif';

const Loading = props => {
  return (
    <>
      {props.popover ? (
        <Dialog open={props.open} style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <div className='row align-items-center justify-content-center' style={{ opacity: '1' }}>
            <img src={waiting} alt='Loading' width='94.67' height='117.33' style={{ margin: '0 0.7rem 0.7rem' }} />
          </div>
        </Dialog>
      ) : (
        <div
          open={props.open}
          className='container'
          style={{ height: `${props.height ? props.height : '80vh'}`, backgroundColor: 'transparent' }}
        >
          <div
            className='row align-items-center justify-content-center'
            style={{ height: '90%', backgroundColor: 'transparent' }}
          >
            <img src={waiting} alt='Loading' width='142' height='176' style={{ backgroundColor: 'transparent' }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
