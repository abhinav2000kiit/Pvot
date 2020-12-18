import React from 'react'
import { Row,Image } from 'react-bootstrap'
import { Typography,Button } from '@material-ui/core'
import EventNoteIcon from '@material-ui/icons/EventNote';
import AlarmIcon from '@material-ui/icons/Alarm';
import moment from 'moment'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

const Webinar = props => {

    let { data } = props;
    console.log(data);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
                PaperProps={{
                    style: {
                      backgroundColor: 'rgb(250, 250, 250)'
                    },
                  }}
            >
                <div style={{display:'flex',justifyContent:'space-between',padding:'15px 15px 0px'}}>
                    <div>
                        <Image src={require('../../../assets/images/jpeg/ayush.jpeg')} roundedCircle style={{ height: '70px' }} />
                        <h6 style={{marginBottom:'5px',marginTop:'15px'}}>{data.description}</h6>
                        <p>By {data.analyst.first_name}&nbsp;{data.analyst.last_name}</p>
                    </div>
                    <div><CloseIcon style={{color:'#616161',cursor:'pointer'}} onClick={handleClose} /></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'40% 30% 30%',margin:'0px 15px',padding:'10px',backgroundColor:'#fff'}}>
                    <div>
                        <p style={{marginBottom:'3px'}}><EventNoteIcon style={{fontSize:'12px'}} /></p>
                        <p style={{fontSize:'11px',marginBottom:'3px'}}>{moment(data.webinar_time).format('DD/MMM/YYYY')}</p>
                    </div>
                    <div style={{borderLeft:'1px solid #F5F4F4',borderRight:'1px solid #F5F4F4',margin:'0px 5px',padding:'0px 5px'}}>
                        <p style={{marginBottom:'3px'}}><AlarmIcon style={{fontSize:'12px'}} /> </p>
                        <p style={{fontSize:'11px',marginBottom:'3px'}}>3 Hours</p>
                    </div>
                    <div style={{display: 'flex',alignItems: 'center',paddingLeft:'5px'}}><span style={{color:'#2962ff'}}><strong>₹{data.total_charges}</strong></span></div>
                </div>
                <div style={{margin:'0px 15px',padding:'10px'}}>
                  <p>
                      About Webinar
                  </p>
                  <CustomPoint comment={"Reading Charts"} />
                  <CustomPoint comment={"Trading Strategies"} />
                  <CustomPoint comment={"Price Actions"} />
                </div>
                <DialogActions>
                <Button
                    onClick={() => {
                    setOpen(false);
                    }}
                    color='primary'
                    variant="contained"
                    fullWidth
                    autoFocus
                    style={{textTransform:'none'}}
                >
                    Sign Up
                </Button>
                </DialogActions>
            </Dialog>
            <Row style={{backgroundColor:'#fafafa',padding:'15px',display:'grid',gridTemplateColumns:'30% 70%',margin:'10px 0px',cursor:'pointer'}} onClick={()=>setOpen(true)}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Image src={require('../../../assets/images/jpeg/ayush.jpeg')} roundedCircle style={{ height: '80px' }} />
                </div>
                <div style={{padding:'10px'}}>
                    <Typography variant="subtitle2" style={{fontSize:'14px'}}>
                        {data.description}
                    </Typography>
                    <Typography variant="subtitle"  style={{fontSize:'12px'}}>
                        By {data.analyst.first_name}&nbsp;{data.analyst.last_name}&nbsp; | &nbsp;<span style={{color:'#2962ff'}}><strong>₹{data.total_charges}</strong></span>
                    </Typography>
                    <Typography variant="subtitle"  style={{display:'block',fontSize:'12px'}}>
                        <EventNoteIcon style={{fontSize:'12px'}} />&nbsp;{moment(data.webinar_time).format('DD/MMM/YYYY')} &nbsp;&nbsp;&nbsp;<AlarmIcon style={{fontSize:'12px'}} /> 3 Hours
                    </Typography>
                </div>
            </Row>
        </>
    )
}

const CustomPoint = props => {

    return(
        <p>
            <span style={{
                height: '8px',
                width: '8px',
                backgroundColor: '#2962ff',
                borderRadius: '50%',
                display: 'inline-block',
                marginTop:'5px'
            }}
            />
            &nbsp;&nbsp;&nbsp;{props.comment}
        </p>
    )
}

export default Webinar