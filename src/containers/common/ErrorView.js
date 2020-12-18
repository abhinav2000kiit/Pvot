import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import "./error.css";

class ErrorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevpath : this.props.location && this.props.location.state && this.props.location.path && this.props.location.state.path
    }
  }
  
  render() {
    const { prevpath } = this.state;
    console.log(prevpath)
    return (
    <div className='container'>
    <div className='row content'>
      {/* {prevpath === "splash" ?
       <>
        <div className='col-lg-12'>
          <h1>404</h1>
          <h2>Oops, the site you're looking for is mobile only.</h2>
        </div>
      </>  : 
       <div className='col-lg-12'>
        <h1>404</h1>
        <h2>Oops, the page you're looking for does not exist.</h2>
        <p>
          You may want to head back to the homepage.
          <br />
            If you think something is broken, report a problem.
        </p>
        <span className='btn' onClick={()=> { this.props.history.push('/')} } >RETURN HOME</span>
        <span className='btn'>REPORT PROBLEM</span>
      </div>
      } */}
      <div className='col-lg-12'>
          <Row>
            <Col className='right-col'>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <div className='text-center pvot-header'>Pvot</div> */}
              <Image style={{ height: "150px", left: "25%", right: "25%" }} src={require('../../assets/images/svg/Logo.svg')} />
                
          <h1>404</h1>
          <h2>Oops, the site you're looking for is mobile only.</h2> <br></br>
            </Col>
          </Row>
          <Row>
            <Col className='left-col'>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
        </div>
     
    </div>
    </div>
    )
  }
}

export default withRouter(ErrorView)
