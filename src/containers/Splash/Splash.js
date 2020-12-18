import React from 'react';
import './Splash.scss';
import { Row, Col, Image } from 'react-bootstrap';
import { isBrowser, isMobile, isMobileOnly } from 'react-device-detect';
import { withRouter } from 'react-router-dom';

class Splash extends React.Component {
  componentDidMount() {
    setTimeout(
      function() {
        if (isMobileOnly) {
          this.props.history.push('/user-analyst');
        } else if (isBrowser) {
          this.props.history.push('/welcome');
        } else {
          this.props.history.push('/error', { path: 'splash' });
        }
      }.bind(this),
      3000
    );
  }

  render() {
    return (
      <Row className='parent fa-fa-fa'>
        <Col className='center-col-around'>
          <Row>
            <Col className='right-col'>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <div className='text-center pvot-header'>Pvot</div> */}
              <Image
                style={{ height: '130px', left: '25%', right: '25%', position: 'relative' }}
                src={require('../../assets/images/svg/Logo.svg')}
              />
              <div className='text-center mt-4 pvot-sub-heading'>Copy portfolio of investors and traders</div>
            </Col>
          </Row>
          <Row>
            <Col className=''>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Splash);
