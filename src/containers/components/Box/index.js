import React from 'react';

const Box = props => {
  // const [isSelected,setIsSelected] = React.useState(props.isSelected)
  // console.log(`isSeected`,props.text,props.isSelected)

  return (
    <>
      <div
        onClick={() => {
          if (props.handleChange) {
            props.handleChange(props.text);
          }
        }}
        style={{
          height: props.height ? props.height : '50px',
          width: '100%',
          backgroundColor: props.allowed ? (props.isSelected === true ? '#2962FF' : '#fff') : '#eeeeee',
          color: props.allowed ? (props.isSelected === true ? '#fff' : '#616161') : '#616161',
          border: props.allowed ? (props.isSelected === true ? '1px solid #2962FF' : '1px solid #EEEEEE') : 0,
          borderRadius: '1rem',
          display: 'flex',
          fontSize: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: props.allowed ? 'pointer' : 'not-allowed',
          pointerEvents: props.allowed ? 'auto' : 'none'
        }}
      >
        {props.text}
      </div>
    </>
  );
};

export default Box;
