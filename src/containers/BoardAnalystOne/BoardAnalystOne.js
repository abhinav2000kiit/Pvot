import React from 'react';
import './BoardAnalystOne.scss';
import { Row, Col, Image } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import Flickity from 'react-flickity-component';
import Grow from '@material-ui/core/Grow';

class BoardAnalystOne extends React.Component {
  handleFirstToSecondProgressAnalyst = () => {
    this.props.history.push('/board-analyst-two');
  };

  handleSkip = () => {
    this.props.history.push('/userauth');
  };

  render() {
    return (
      <Grow in={true} timeout={500}>
        <Row className='parent'>
          <Col className='center-col-space-evenly'>
            <Row className='mt-2'>
              <Col className='right-col'>
                <div className='one-six-black-light' onClick={this.handleSkip}>
                  <u>Skip</u>
                </div>
              </Col>
            </Row>
            <Flickity>
              <div
                className='board center-col-space-evenly'
                style={{ width: '90%', marginRight: '15px', borderRadius: '1rem', height: '80vh' }}
              >
                <Row>
                  <Col>
                    <Image
                      src={require('../../assets/images/svg/Analyst_Onboarding_002_Illustration.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='signin-sub-heading'>Attract your ideal clientele</div>
                    <div className='mt-3 signin-forgot-password'>
                      Focus on what you do the best and leave the customer-hunting to us.
                    </div>
                  </Col>
                </Row>
              </div>
              <div
                className='board center-col-space-evenly'
                style={{ width: '90%', marginRight: '15px', borderRadius: '1rem', height: '80vh' }}
              >
                <Row>
                  <Col>
                    <Image
                      src={require('../../assets/images/svg/Analyst_Onboarding_003_Illustration.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='signin-sub-heading'>Show off your talent</div>
                    <div className='mt-3 signin-forgot-password'>
                      Curate your public performance profile by trading on Pvot-X<sup>TM</sup>.
                    </div>
                  </Col>
                </Row>
              </div>
              <div
                className='board center-col-space-evenly'
                style={{ width: '90%', marginRight: '15px', borderRadius: '1rem', height: '80vh' }}
              >
                <Row>
                  <Col>
                    <Image
                      src={require('../../assets/images/svg/Analyst_Onboarding_004_Illustration.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='signin-sub-heading'>Stand out from the crowd</div>
                    <div className='mt-3 signin-forgot-password'>
                      Earn a name in the market for your advising mastery.
                    </div>
                  </Col>
                </Row>
                <Row className='free-circle'>
                  <Col className='center-col'>
                    <Image
                      src={require('../../assets/images/svg/arrow_white.svg')}
                      className='right-arrow-white'
                      onClick={() => this.props.history.push('/userauth')}
                    />
                    <CircularProgress className='progress' variant='static' value={100} />
                  </Col>
                </Row>
              </div>
            </Flickity>
          </Col>
        </Row>
      </Grow>
    );
  }
}

export default BoardAnalystOne;
