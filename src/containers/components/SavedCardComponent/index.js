import React from 'react'
import { Image } from 'react-bootstrap'
import { Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { Row } from "react-bootstrap"
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: 10,
  },
}));


const SavedCard = props => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // console.log(`propssss`,props.data.card_number.slice(props.data.card_number.length-2,props.data.card_number.length))
    // console.log(`propssss`,props.data.card_number.length-2)

    return(
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <Row>
                    <Typography className={classes.typography}>Are you sure you want to remove this card?</Typography>
                </Row>
                <Row style={{padding:'10px',justifyContent:'flex-end',margin:'0px'}}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} style={{color:'red'}}>Remove</Button>
                </Row>
            </Popover>
            <div style={{border:'1px solid #eeeeee',margin:'10px 0px',backgroundColor:'#fff',padding:'20px'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Image src={require('../../../assets/images/HSBC-logo.png')} style={{ height: '18px'}} />
                    <div style={{cursor:'pointer'}}>
                        <Typography variant="caption" style={{color:'#616161'}} onClick={handleClick}>
                            <CloseIcon style={{fontSize:'15px'}} />&nbsp;Remove
                        </Typography>
                    </div>
                </div>
                <div style={{marginTop:'10px'}}>
                    <Typography variant="subtitle2" style={{color:'#212121'}}>
                        {props.data.card_number.slice(0,2)}** - **** - **** - **{props.data.card_number.slice(props.data.card_number.length-2,props.data.card_number.length)}
                    </Typography>
                </div>
            </div>
        </>
    )

}

export default SavedCard