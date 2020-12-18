import React from 'react'
import { Image } from 'react-bootstrap'
import moment from 'moment';

const Notification = props => {
    return(
        <>
            <div style={{display:'grid', gridTemplateColumns: '25% 75%',padding:'15px'}}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Image src={props.data.icon} roundedCircle style={{ height: '50px', width: '50px' }} />
                </div>
                <div style={{paddingRight:'10px'}}>
                    <p style={{fontSize:'14px',color:'#212121',marginBottom:'5px'}}>{props.data.body}</p>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px'}}>
                        <span style={{color:'#bdbdbd'}}>
                            {moment(props.data.data.dateOfArrival).format('MMMM Do YYYY')}
                        </span>
                        <span style={{color:'#bdbdbd'}}>
                            {moment(props.data.data.dateOfArrival).fromNow()}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Notification