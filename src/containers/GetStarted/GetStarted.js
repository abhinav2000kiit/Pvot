import React from 'react';
import './GetStarted.scss';
import { Row, Col, Image } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class GetStarted extends React.Component {
  handleGetStarted = () => {
    // alert("Work in progress");
    // this.props.history.push('/signin');
    this.props.history.push('/userauth');
  };

  render() {
    return (
      <Row className='parent'>
        <Col className='center-col-around'>
          <Row className='variable-margin-top-minor'>
            <Col className='right-col'>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
          <Row className='variable-margin-top-minor'>
            <Col className='center-col'>
              <Image src={require('../../assets/icons/svg/success.svg')} className='green-tick' />
            </Col>
          </Row>
          <Row className='variable-margin-top-minor'>
            <Col className='center-col'>
              <div className='signin-sub-heading'>You have successfully</div>
              <div className='signin-sub-heading'>Signed Up</div>
            </Col>
          </Row>
          <Row className='variable-margin-top-minor'>
            <Col className='center-col'>
              <Button
                className='pointer'
                onClick={this.handleGetStarted}
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >
                Get Started
              </Button>
            </Col>
          </Row>
          <Row className='variable-margin-top-minor variable-margin-bottom-minor'>
            <Col className='left-col'>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default withRouter(GetStarted);
