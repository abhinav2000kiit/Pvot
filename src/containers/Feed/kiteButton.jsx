import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';

import { Mixpanel } from '../../shared/mixPanel'

function KiteButton(props) {
  // console.log("renderd",props)

  useEffect(() => {
    
    Mixpanel.track('Kite button Clicked - Investor');
    window.KiteConnect.ready(function() {
      var kite = new window.KiteConnect('lqcfj2e6u5wq1c3f');

      kite.add({
        tradingsymbol: props.instrument && props.instrument.trading_symbol,
        exchange: props.instrument && props.instrument.exchange,
        transaction_type: props.order_type && props.order_type.toUpperCase(),
        order_type: 'LIMIT',
        product: 'MIS',
        price: props.price,
        quantity: props.quantity,
        variety: 'bo',
        stoploss: props.stop_loss,
        squareoff: props.target,
        trailing_stoploss: 0
      });

      kite.renderButton(`#${props.data && props.data.record_id}-button`);
    });
  }, []);

  return (
    <Row style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '0.3rem 0 0.5rem' }}>
      <div>
        <div id={`${props.data && props.data.record_id}-button`} style={{ color: '#212121' }}></div>
      </div>
    </Row>
  );
}

export default KiteButton;
