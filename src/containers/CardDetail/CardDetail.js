import React from 'react';
import './CardDetail.scss';
import { Row, Col } from 'react-bootstrap';

class CardDetail extends React.Component {
  render() {
    return (
      <Row className='container-fluid'>
        <Col className='center-col-special'>Card Detail</Col>
      </Row>
    );
  }
}

export default CardDetail;
