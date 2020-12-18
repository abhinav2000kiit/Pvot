import React from 'react'
import Header from '../components/Header/customHeader'
import { Typography,Button, CircularProgress, TextField } from '@material-ui/core'
import { Row,Col } from 'react-bootstrap'
import SavedCard from '../components/SavedCardComponent'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom'

const CardDetails = props => {

    React.useEffect(()=>{
        props.fetchUserCards()
    },[])

    const [addCreditCard,setAddCreditCard] = React.useState(false)
    const [addDebitCard,setAddDebitCard] = React.useState(false)
    const toggleAddCreditCard = () => {
        setAddCreditCard(!addCreditCard)
    }
    const toggleAddDebitCard = () => {
        setAddDebitCard(!addDebitCard)
    }

    let { savedCards } = props;
    console.log(`savedCards: `,savedCards)

    return(
        <>
            <Header title="Card Details" />
            {
                savedCards === null?
                <div style={{width:'100%',padding:'20px',display:'flex',justifyContent:'center'}}>
                    <CircularProgress />
                </div>
                :
                <div style={{padding:'20px'}}>
                    <Row>
                        <Typography variant="subtitle2" style={{color:'#212121',marginBottom:'10px'}}>Linked Cards</Typography>
                    </Row>
                    <Row style={{justifyContent:'space-between'}}>
                        <Typography variant="subtitle" style={{color:'#616161'}}>Debit Cards</Typography>
                        <Typography variant="subtitle" style={{color:'#2962ff',textDecoration:'underline',cursor:'pointer'}} onClick={toggleAddDebitCard}>Add New</Typography>
                    </Row>
                    {
                        addDebitCard === true ?
                        <NewCard />
                        :null
                    }
                    {
                        savedCards.debit_cards.map(c => (<SavedCard data={c} />))
                    }
                    <Row style={{justifyContent:'space-between'}}>
                        <Typography variant="subtitle" style={{color:'#616161'}}>Credit Cards</Typography>
                        <Typography variant="subtitle" style={{color:'#2962ff',textDecoration:'underline',cursor:'pointer'}} onClick={toggleAddCreditCard}>Add New</Typography>
                    </Row>
                    {
                        addCreditCard === true ?
                        <NewCard />
                        :null
                    }
                    {
                        savedCards.credit_cards.map(c => (<SavedCard data={c} />))
                    }
                </div>
            }
        </>
    )

}

const NewCard = props => {

    console.log('propsin NewCards',props)
    const handleChange = (e) => {
        console.log('events: ',e)
    }

    return(
        <>
           <div style={{border:'1px solid #eeeeee',margin:'10px 0px',backgroundColor:'#fff',padding:'20px'}}>
               
                <Row style={{marginTop:'10px'}}>
                    <Col lg={5} md={5} sm={5} xs={5}>
                        Select Bank
                    </Col>
                    <Col lg={7} md={7} sm={7} xs={7}>
                        <FormControl >
                            {/* <InputLabel shrink htmlFor="id-selectbank" style={{ color: '#616161' }}>
                            Select Bank
                            </InputLabel> */}
                            <NativeSelect
                            name='selectbank'
                            value={`HDFC BANK`}
                            onChange={handleChange}
                            //style={{ width: '90%' }}
                            inputProps={{
                                name: 'selectbank',
                                id: 'id-selectbank',
                            }}
                            >
                            <option value={`HDFC BANK`}>HDFC Bank</option>
                            <option value={`Akhand Anand Co.op Bank`}>Akhand Anand Co.op Bank</option>
                            </NativeSelect>
                        </FormControl>
                    </Col>
                </Row>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={{width:'90%',margin:'20px 0px',borderBottom:'1px solid #eeeeee'}} />
                </div>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Typography variant="caption">
                            Card Number
                        </Typography>
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col lg={3} md={3} sm={3} xs={3}>
                        <TextField type="number" oninput="javascript: if (this.value.length > 4) this.value = this.value.slice(0, 4);" />
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={3}>
                        <TextField type="number" input />
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={3}>
                        <TextField type="number" />
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={3}>
                        <TextField type="number" />
                    </Col>
                </Row>
                <Row style={{marginTop:'20px'}}>
                    <Col lg={7} md={7} sm={7} xs={7}>
                        <Row>
                            <Typography variant="caption">
                                Expiry Date
                            </Typography>
                        </Row>
                        <Row style={{display:'grid',gridTemplateColumns:'40% 10% 50%',marginTop:'10px'}}>
                            <TextField style={{fontSize:'10px'}} type="number" />
                            <div style={{fontSize:'20px',paddingLeft:'6px'}}>/</div>
                            <TextField type="number" />
                        </Row>
                    </Col>
                    <Col lg={5} md={5} sm={5} xs={5}>
                    <Row>
                            <Typography variant="caption">
                                CVV
                            </Typography>
                        </Row>
                        <Row style={{marginTop:'10px'}}>
                            <TextField type="number" />
                        </Row>
                    </Col>
                    
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
                    {props.loader ? (
                        <CircularProgress name='circle' color='primary' />
                    ) : (
                        <Button variant="contained" color="primary" style={{width:'250px'}} type="submit">
                            Add Card
                        </Button>
                    )}
                    
                </Row>
            </div> 
        </>
    )
}

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
)(CardDetails);