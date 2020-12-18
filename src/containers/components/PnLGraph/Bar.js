import React from 'react';

const Bar = props => {
  // console.log('props in Bar', props);
  if (props.value > 0) {
    return (
      <div
        style={{
          width: '300px',
          display: 'grid',
          gridTemplateColumns: '10% 45% 45%',
          height: '30px',
          padding: '2px 0px'
        }}
      >
        <div style={{ padding: '4px', fontSize: '12px', borderRight: '1px solid black' }}>{props.month}</div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <span
            style={{
              backgroundColor: 'red',
              width: '0%',
              height: '90%',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
              marginTop: '2px'
            }}
          >
            {' '}
          </span>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
          <span
            style={{
              backgroundColor: 'blue',
              width: `${props.value}%`,
              height: '90%',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              padding: '3px 0px',
              marginTop: '2px'
            }}
          >
            {' '}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: '300px',
          display: 'grid',
          gridTemplateColumns: '10% 45% 45%',
          height: '30px',
          padding: '2px 0px'
        }}
      >
        <div style={{ padding: '4px', fontSize: '12px', borderRight: '1px solid black' }}>{props.month}</div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <span
            style={{
              backgroundColor: 'red',
              width: `${props.value * -1}%`,
              height: '90%',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
              marginTop: '2px'
            }}
          >
            {' '}
          </span>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
          <span
            style={{
              backgroundColor: 'blue',
              width: '0%',
              height: '90%',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              padding: '3px 0px',
              marginTop: '2px'
            }}
          >
            {' '}
          </span>
        </div>
      </div>
    );
  }
};

export default Bar;
