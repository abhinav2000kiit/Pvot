import React from 'react';
import './UserAnalyst.scss';
import { Row, Col, Carousel, Image, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { TiArrowRight } from 'react-icons/ti';
import Flickity from 'react-flickity-component';
import * as actions from '../../redux/actions/index';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';

class UserAnalyst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      index: 0,
      direction: null
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleSelect = (selectedIndex, event) => {
    // alert(selectedIndex)
    if (selectedIndex < 2) {
      if (selectedIndex === 0) {
        this.setState({
          index: 0,
          direction: event.direction
        });
      } else {
        this.setState({
          index: 1
        });
      }
    }
  };

  handleUserLogin = () => {
    this.props.updateGroup('USER');
    this.props.history.push('/board-user-one');
  };

  handleAnalystLogin = () => {
    this.props.updateGroup('ANALYST');
    this.props.history.push('/board-analyst-one');
  };

  render() {
    const { width, height, index, direction } = this.state;
    console.log(`${width}---------------${height}------------------`);

    return (
      <Grow in={true} timeout={500}>
        <Row className='parent'>
          <Col className='center-col-space-evenly'>
            <Row>
              <Col>
                <div className='text-left pvot-sub-heading'>Welcome to Pvot! Let's get started. Which role describes you best?</div>
              </Col>
            </Row>
            <Row>
              <Col className='py-2'>
                <Flickity className='slider-user-analyst'>
                  <Card className='text-center analyst-card user mb-5 mt-3' style={{ width: '75vw', height: '70vh' }}>
                    <Card.Img
                      src={require('../../assets/images/svg/Investor_Onboarding_001_Illustration.svg')}
                      className='pt-2'
                      style={{ height: '60%' }}
                    />
                    <Card.Body style={{ paddingTop: '0' }}>
                      <Card.Title className='analyst-card-title mt-3'>Investor</Card.Title>
                      <Card.Text className='analyst-card-text text-secondary small'>
                        I am looking forward to reliable and trustworthy advice on how I can manage my money better.
                      </Card.Text>
                    </Card.Body>
                    <Button
                      fullWidth
                      variant='contained'
                      style={{
                        boxShadow: '0 15px 15px rgba(0, 0, 0, 0.25)',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: '400'
                      }}
                      onClick={this.handleUserLogin}
                    >
                      Login
                      <TiArrowRight size={26} />
                    </Button>
                  </Card>
                  <Card
                    className='text-center analyst-card analyst mb-5 mt-3'
                    style={{ width: '75vw', height: '70vh' }}
                  >
                    <Card.Img
                      src={require('../../assets/images/svg/Analyst_Onboarding_001_Illustration.svg')}
                      style={{ height: '60%' }}
                    />
                    <Card.Body style={{ paddingTop: '0' }}>
                      <Card.Title className='analyst-card-title mt-3'>Expert</Card.Title>
                      <Card.Text className='analyst-card-text text-secondary small'>
                        I have experience in giving good and relevant advices to people when it comes to equity.
                      </Card.Text>
                    </Card.Body>
                    <Button
                      fullWidth
                      variant='contained'
                      style={{
                        boxShadow: '0 15px 15px rgba(0, 0, 0, 0.25)',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: '400'
                      }}
                      onClick={this.handleAnalystLogin}
                    >
                      Login
                      <TiArrowRight size={26} />
                    </Button>
                  </Card>
                </Flickity>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grow>
    );
  }
}

const mapStateToProps = state => ({
  logoutLoading: state.auth.logoutLoading
});

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: 'SET_GROUP', payload: group })
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAnalyst);
