import React from 'react';
import Bar from './Bar';
import ColumnCharts from '../../Graphs/ColumnCharts';

const Graph = props => {
  console.log('props in Graph', props);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
        <div style={{ width: '300px' }}>
          {Object.values(props.data).map((d, index) => (
            // <Bar month={d.month} value={d.returns ? d.returns : 0} />
            <ColumnCharts />
          ))}
          {/* <Bar value={20}/>
                    <Bar value={-80}/>
                    <Bar value={-50}/>
                    <Bar value={80}/>
                    <div style={{width:'200px',display:'grid',gridTemplateColumns:'50% 50%',height:'20px',marginTop:'2px'}}>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}><span style={{backgroundColor:'red',width:'0%',height:'100%',borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px'}}> </span></div>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-start'}}><span style={{backgroundColor:'blue',width:'50%',height:'100%',borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}> </span></div>
                    </div>
                    <div style={{width:'200px',display:'grid',gridTemplateColumns:'50% 50%',height:'20px',marginTop:'2px'}}>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}><span style={{backgroundColor:'red',width:'60%',height:'100%',borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px'}}> </span></div>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-start'}}><span style={{backgroundColor:'blue',width:'0%',height:'100%',borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}> </span></div>
                    </div>
                    <div style={{width:'200px',display:'grid',gridTemplateColumns:'50% 50%',height:'20px',marginTop:'2px'}}>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}><span style={{backgroundColor:'red',width:'30%',height:'100%',borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px'}}> </span></div>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-start'}}><span style={{backgroundColor:'blue',width:'0%',height:'100%',borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}> </span></div>
                    </div>
                    <div style={{width:'200px',display:'grid',gridTemplateColumns:'50% 50%',height:'20px',marginTop:'2px'}}>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}><span style={{backgroundColor:'red',width:'0%',height:'100%',borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px'}}> </span></div>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-start'}}><span style={{backgroundColor:'blue',width:'70%',height:'100%',borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}> </span></div>
                    </div> */}
        </div>
      </div>
    </>
  );
};

export default Graph;
