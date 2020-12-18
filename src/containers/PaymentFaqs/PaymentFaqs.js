import React from 'react';
import './PaymentFaqs.scss';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header/customHeader'
import BottomNavigator from '../components/BottomNavigator'

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <>
      <Header title={'Payment FAQs'}/>
      <div style={{padding:'20px',marginBottom:'40px'}}>
        
        <Row>
          <h6>Header</h6>
        </Row>
        <Row>
          <p>
          Lorem ipsum dolor sit amet, consectetur 
          adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad 
          minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id 
          est laborum.
          </p>
        </Row>
        <Row>
          <h6>Header</h6>
        </Row>
        <Row>
          <p>
          Lorem ipsum dolor sit amet, consectetur 
          adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad 
          minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id 
          est laborum.
          </p>
        </Row>
        <Row>
          <h6>Header</h6>
        </Row>
        <Row>
          <p>
          Lorem ipsum dolor sit amet, consectetur 
          adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad 
          minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id 
          est laborum.
          </p>
        </Row>
      </div>
      <BottomNavigator/>
      </>
    );
  }
}

export default PrivacyPolicy;
