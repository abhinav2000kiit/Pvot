import React from 'react';
import './BoardUserOne.scss';
import { Row, Col, Image } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TiArrowRight } from 'react-icons/ti';
import Flickity from 'react-flickity-component';
import Grow from '@material-ui/core/Grow';

class BoardUserOne extends React.Component {
  handleFirstToSecondProgressUser = () => {
    this.props.history.push('/board-user-two');
  };

  handleSkip = () => {
    this.props.history.push('/userauth');
  };

  render() {
    return (
      <Grow in={true} timeout={1000}>
        <Row className='parent'>
          <Col className='center-col-around'>
            <Row>
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
                      src={require('../../assets/images/svg/Investor_Onboarding_002_Illustration.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='signin-sub-heading'>Follow advisors free of charge</div>
                    <div className='mt-3 signin-forgot-password'>
                      Gain unlimited free visibility to multiple advisor's real data-driven performance profiles.
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
                      src={require('../../assets/images/svg/Investor_Onboarding_003_Illustration.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='signin-sub-heading'>Choose your perfect advisor</div>
                    <div className='mt-3 signin-forgot-password'>
                      Get real-time access to your stock experts strategies for your financial needs.
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
                      src={require('../../assets/images/svg/Investor_Onboarding_004_Illustration.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='signin-sub-heading'>Invest and trade like a pro</div>
                    <div className='mt-3 signin-forgot-password'>
                      Say bye to confusion and take advantage of simple and straight actionables to start earning!
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

export default BoardUserOne;
