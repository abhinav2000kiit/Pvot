import React from 'react';
import { Row, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import '../Feed/feed.scss';

const SubcriptionCard = props => {
  const { data } = props;
  console.log('data', data);
  // console.log(data.stop_loss_hit, data.target_hit);
  return (
    <>
      {/* style={{ width: '100%', border: '1px solid #eeeeee', padding: '15px 15px 0px', marginBottom: '10px' }} */}
      <div className='card'>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='col-8 p-0 pr-2 m-0 mr-3'>
            <p style={{ color: '#212121', fontSize: '16px', padding: '2px', marginBottom: '0px' }}>
              <strong> Transaction Id :</strong> {data.record_id && data.record_id}
            </p>
            <p style={{ color: '#616161', fontSize: '12px', padding: '2px', marginBottom: '0px' }}>
              {/* {data.instrument && data.instrument.exchange}&nbsp;
              {moment(data.order_placement_time).format('DD MMMM/YY')} */}
              {data.subscription_plan.segment.name && data.subscription_plan.segment.name.toUpperCase()}
              {' | '}
              {data.subscription_plan.trade_type && data.subscription_plan.trade_type.toUpperCase()}
            </p>
            <p
              style={{
                color: '#2962ff',
                fontSize: '10px',
                fontStyle: 'italic',
                padding: '0px',
                marginBottom: '3px',
                cursor: 'pointer'
              }}
            >
              <Image src={data.analyst.profile_picture} roundedCircle style={{ height: '13px', width: '13px' }} />
              &nbsp;
              {/* <Link to='/user/view-analyst-profile'> */}
              {data.analyst.name}
              {/* </Link> */}
              &nbsp;&nbsp;
              {/* <ChatBubbleOutlineIcon style={{ fontSize: '10px' }} /> */}
            </p>
            <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
              <strong style={{ color: 'black' }}>Amount :</strong> ₹{data.amount}
            </p>
            <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
              <strong style={{ color: 'black' }}>Validity :</strong> {data.subscription_plan.days} days
            </p>
          </div>

          <div>
            {data.status === 'SUBSCRIBED' && (
              <p
                style={{
                  color: '#808080',
                  padding: '5px',
                  backgroundColor: '#DCDCDC',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                {data.status}
              </p>
            )}
            {data.status === 'EXPIRED' && (
              <p
                style={{
                  color: '#F44336',
                  padding: '5px',
                  backgroundColor: '#FED7D4',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                {data.status}
              </p>
            )}

            <p style={{ color: '#212121', fontSize: '12px' }}>
              <b>Start date :</b> <br></br>
              {moment(data.subscription_start_date).format('DD/MM/YYYY')}
            </p>
            <p style={{ color: '#212121', fontSize: '12px' }}>
              <b>End date :</b> <br></br>
              {moment(data.subscription_end_date).format('DD/MM/YYYY')}
            </p>
          </div>
        </Row>
      </div>
    </>
  );
};

export default withRouter(SubcriptionCard);
