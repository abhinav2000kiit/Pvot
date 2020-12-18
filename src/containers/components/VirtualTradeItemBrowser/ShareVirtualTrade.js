import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Row, Col, Image } from 'react-bootstrap';
import moment from 'moment';
import ShareIcon from '@material-ui/icons/Share';
import htmlToImage from 'html-to-image';

const ShareVirtualTrade = ({ data, id, showDialog, setDialog }) => {
  const handleShare = () => {
    if (data.status === 'CLOSED') {
      console.log(data.analyst);
      console.log(data);
      let node = document.getElementById(id);
      htmlToImage.toBlob(node).then(blob => {
        let file = new File([blob], 'trade.png', { type: 'image/png' });
        if (navigator.share) {
          navigator
            .share({
              text: `Check out this trade by ${data.analyst.name}!\nTo get such trades live, sign up on Pvot app from Play store.\n\n`,
              files: [file],
              url: 'https://play.google.com/store/apps/details?id=in.pvot'
            })
            .then(() => console.log('success'))
            .catch(err => console.log(err));
        } else {
          console.log('browser not supported');
        }
      });
    }
  };

  return (
    <>
      <Dialog fullWidth={true} open={showDialog} onClose={() => setDialog(false)}>
        <div id={id} style={{ backgroundColor: 'white' }}>
          <Row className='py-2'>
            <Col className='col-2 py-2'>
              <Image width='100%' src={require('../../../assets/images/svg/Logo.svg')} />
            </Col>
            <Col className='col-10'>
              <div className='small'>
                <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className='col-9 p-0 pr-2 m-0 mr-auto'>
                    <p style={{ color: '#212121', fontSize: '14px', padding: '2px', marginBottom: '0px' }}>
                      <strong>{data.instrument && data.instrument.trading_symbol}</strong>
                      &nbsp;
                    </p>
                    <p style={{ color: '#616161', fontSize: '10px', padding: '2px', marginBottom: '0px' }}>
                      {data.segment && data.segment.name.toUpperCase()}
                      {' | '}
                      {data.trade_type && data.trade_type.toUpperCase()}
                      {' | '}
                      {data.order_type && data.order_type.toUpperCase()}
                      {' | '}
                      {data.complexity && data.complexity.toUpperCase()}
                    </p>
                  </div>
                  <div className='col-3 m-0 p-0'>
                    {data.status === 'CLOSED' && (
                      <div
                        className='row'
                        style={{
                          color: '#101010',
                          padding: '5px',
                          backgroundColor: '#B1AEC1',
                          borderRadius: '3px',
                          fontSize: '12px',
                          textAlign: 'center',
                          marginBottom: '3px'
                        }}
                      >
                        <p className='mb-0 mx-auto'>
                          <span style={{ fontSize: '10px' }}>{data.status}</span>
                        </p>
                      </div>
                    )}

                    <div className='text-center'>
                      <p style={{ color: '#212121', fontSize: '10px' }}>
                        {moment(data.order_placement_time).format('DD/MM' + ' ' + 'HH:mm')}
                      </p>
                    </div>
                  </div>
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <div>
                    <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '10px' }}>
                      Order Price
                    </p>
                    <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '10px' }}>
                      {data.price}
                    </p>
                    <p style={{ color: '#9e9e9e', padding: '10px 2px 2px', marginBottom: '0px', fontSize: '10px' }}>
                      Target Price
                    </p>
                    <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '10px' }}>
                      {data.target}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '10px' }}>Quantity</p>
                    <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '10px' }}>
                      {data.quantity}
                    </p>
                    <p style={{ color: '#9e9e9e', padding: '10px 2px 2px', marginBottom: '0px', fontSize: '10px' }}>
                      Stop Loss
                    </p>
                    <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '10px' }}>
                      {data.stop_loss}
                    </p>
                  </div>
                  <div>
                    <div>
                      <p
                        style={{
                          color: '#9e9e9e',
                          padding: '2px',
                          marginBottom: '0px',
                          fontSize: '10px',
                          textAlign: 'center'
                        }}
                      >
                        {data.gains >= 0 ? <>Gain</> : <>Loss </>}
                      </p>
                      <p
                        style={{
                          color: data.gains >= 0 ? '#038C33' : '#F44336',
                          padding: '5px',
                          padding: '2px',
                          marginBottom: '0px',
                          // backgroundColor: data.gains >=0 ? '#C0FEE0': '#FED7D4',
                          borderRadius: '3px',
                          fontSize: '12px'
                        }}
                        className='text-center'
                      >
                        {Number(data.gains).toFixed(2)}({Number(data.gains_percentage).toFixed(2) + '%'})
                      </p>
                    </div>
                    <p
                      style={{
                        color: '#9e9e9e',
                        padding: '10px 2px 2px',
                        marginBottom: '0px',
                        fontSize: '12px',
                        textAlign: 'center'
                      }}
                    >
                      <>Risk : Reward</>
                    </p>
                    <p
                      style={{
                        color:
                          data.reward === data.risk
                            ? '#f0880a'
                            : data.reward > data.risk
                            ? '#038C33'
                            : data.reward < data.risk
                            ? '#F44336'
                            : '#9e9e9e',
                        padding: '5px',
                        padding: '2px',
                        marginBottom: '0px',
                        borderRadius: '3px',
                        fontSize: '12px'
                      }}
                      className='text-center'
                    >
                      {`1: ${(data.reward / data.risk).toFixed(2)}`}
                    </p>
                  </div>
                </Row>
                {/* <Row className='mt-3'>
                <Col>
                  <ClickAwayListener onClickAway={()=> setEdit(false)} >
                    <Input
                      onClick={()=> setEdit(true)}
                      disableUnderline={!isEdit}
                        name='check'
                        placeholder='Additional Info'
                        fullWidth
                      />
                  </ClickAwayListener>
                </Col>
              </Row> */}
              </div>
            </Col>
          </Row>
          <Row className='mt-2 py-2 center-row'>
            <Col className='center-col'>
              <Row className='center-row'>
                <span className='ml-2' style={{ fontSize: '10px', fontWeight: 'bold' }}>
                  {data.analyst.name}
                </span>
              </Row>
            </Col>
            <Col className='center-col'>
              <span style={{ fontWeight: 'bold', color: '#2962ff', fontSize: '16px' }}>pvot.in</span>
            </Col>
            <Col className='center-col'>
              <Image width='95%' src={require('../../../assets/images/GooglePlay.png')} />
            </Col>
          </Row>
        </div>
        <Row className='mt-1' style={{ boxShadow: '0 0 8px 0' }}>
          <Col onClick={handleShare} className='center-col py-2'>
            <ShareIcon color='primary' />
          </Col>
        </Row>
      </Dialog>
    </>
  );
};

export default ShareVirtualTrade;
