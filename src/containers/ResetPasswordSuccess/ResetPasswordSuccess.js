import React from 'react';
import './ResetPasswordSuccess.scss';
import { Row, Col, Image } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class ResetPasswordSuccess extends React.Component {
  handleResetPasswordSuccess = () => {
    this.props.history.push('/signin');
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
              <div className='signin-sub-heading'>Password Changed</div>
              <div className='signin-sub-heading'>Successfully</div>
            </Col>
          </Row>
          <Row className='variable-margin-top-minor'>
            <Col className='center-col'>
              <Button
                className='pointer'
                onClick={this.handleResetPasswordSuccess}
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >
                Login
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

export default withRouter(ResetPasswordSuccess);
