import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { Button, Typography } from '@material-ui/core';
import qs, { parse } from 'qs';
import moment from 'moment-timezone';
import NISM from './NISM-logo.png';
import Loading from '../Loading/Loading';

import './UserViewAnalystProfile.css';

const Bio = props => {
  const sectorAllocations = props.analystsForSubscriptionDetails
    ? props.analystsForSubscriptionDetails.analyst_info
      ? props.analystsForSubscriptionDetails.analyst_info.segment_list
        ? props.analystsForSubscriptionDetails.analyst_info.segment_list.map(allocation => {
            return {
              name: allocation.segment.name,
              allocation: allocation.initial_allocation
            };
          })
        : null
      : { allocation: 0 }
    : '';

  const findSum = arr => {
    let sum = 0;
    arr.map(item => {
      sum = sum + item.allocation;
    });
    return sum;
  };

  const public_page = props.history && props.history.location.pathname === '/analyst-public-profile-view';

  let analyst_id = public_page
    ? qs.parse(props.history.location.search, { ignoreQueryPrefix: true }).analyst_id
    : props.history.location && props.history.location.state
    ? props.history.location.state.user_id
    : props.user
    ? props.user
    : null;

  const [followed, setFollowed] = React.useState(
    props.analystsForSubscriptionDetails ? props.analystsForSubscriptionDetails.followed : false
  );

  const toggleFollowed = () => {
    setFollowed(!followed);
  };

  const follow = id => {
    if (followed) {
      props.unFollowAnalyst(id);
      toggleFollowed();
    } else {
      props.followAnalyst(id);
      toggleFollowed();
    }
  };

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <>
      {props ? (
        props.analystsForSubscriptionDetails ? (
          <div style={{ padding: '0 10px', marginBottom: '40px', width: '100%' }}>
            <div style={{ maxWidth: '100%' }}>
              <div
                style={{
                  backgroundColor: '#fff'
                }}
              >
                <Row style={{ padding: '1rem 1rem 2rem 1rem', borderBottom: '0.6px solid #B1AEC1' }}>
                  <div className='col-2'>
                    <Image
                      src={require('../../assets/images/DotsGrid.png')}
                      style={{ height: '130px', width: '130px', position: 'absolute', left: '0px', top: '-10px' }}
                    />
                    {props && props.analystsForSubscriptionDetails ? (
                      <Image
                        src={
                          props &&
                          props.analystsForSubscriptionDetails.analyst_info &&
                          props &&
                          props.analystsForSubscriptionDetails.analyst_info.profile_picture
                            ? props && props.analystsForSubscriptionDetails.analyst_info.profile_picture
                            : require('../../assets/images/jpeg/placeholder.jpg')
                        }
                        roundedCircle
                        style={{ height: '100px', width: '100px', zIndex: '999' }}
                      />
                    ) : (
                      <Image
                        src={
                          props.profileImage ? props.profileImage : require('../../assets/images/jpeg/placeholder.jpg')
                        }
                        roundedCircle
                        style={{ height: '100px', width: '100px', zIndex: '999' }}
                      />
                    )}
                  </div>
                  <div className='col-5'>
                    <Row>
                      <Typography variant='h6'>
                        <div>
                          {props && props.analystsForSubscriptionDetails ? (
                            <>
                              {props &&
                                props.analystsForSubscriptionDetails.analyst_info &&
                                props &&
                                props.analystsForSubscriptionDetails.analyst_info.user.name}
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                      </Typography>
                      <div style={{ fontSize: '14px', position: 'relative', right: '-4.4rem', top: '.3rem' }}>
                        <i>
                          Since{' '}
                          {moment(
                            props &&
                              props.analystsForSubscriptionDetails &&
                              props.analystsForSubscriptionDetails.analyst_info
                              ? props.analystsForSubscriptionDetails.analyst_info.created_date
                                ? props.analystsForSubscriptionDetails.analyst_info.created_date
                                : ''
                              : ''
                          ).format('MM/YYYY')}
                        </i>
                      </div>
                    </Row>
                    {props &&
                    props.analystsForSubscriptionDetails &&
                    props.analystsForSubscriptionDetails.analyst_info ? (
                      props.analystsForSubscriptionDetails.analyst_info.nism_registered ? (
                        <Row style={{ marginTop: '0.5rem' }}>
                          <Image src={NISM} style={{ width: '4rem', zIndex: '999' }} />
                        </Row>
                      ) : null
                    ) : null}

                    <Row style={{ padding: '0.5rem 0.5rem 0px 0px', fontSize: '14px' }}>
                      <span style={{ color: '#565EBF', fontWeight: '600', marginBottom: '5px' }}>{props.number}</span>
                      &nbsp;
                      <span style={{ fontWeight: '500' }}>TRADES</span>
                      &nbsp;|&nbsp;
                      <div
                        onClick={
                          props.userGroup === 'ANALYST'
                            ? () => props.history.push('/followers', { list: 'Followers' })
                            : null
                        }
                        style={{ textAlign: 'center' }}
                      >
                        <span style={{ color: '#565EBF', fontWeight: '600', marginBottom: '5px' }}>
                          {props.analystsForSubscriptionDetails
                            ? props.analystsForSubscriptionDetails.followers_count
                            : 0}
                        </span>
                        &nbsp;
                        <span style={{ fontWeight: '500' }}>FOLLOWERS</span>
                      </div>
                      &nbsp;|&nbsp;
                      <div
                        onClick={
                          props.userGroup === 'ANALYST'
                            ? () => props.history.push('/subscribers', { list: 'Subscribers' })
                            : null
                        }
                        style={{ textAlign: 'center' }}
                      >
                        {/* <p style={{ color: '#23374d', fontWeight: '600', marginBottom: '5px' }}>{count}</p> */}
                        <span style={{ color: '#565EBF', fontWeight: '600', marginBottom: '5px' }}>
                          {props.analystsForSubscriptionDetails
                            ? props.analystsForSubscriptionDetails.subscriber_count
                            : 0}
                        </span>
                        &nbsp;
                        <span style={{ fontWeight: '500' }}>SUBSCRIBERS</span>
                      </div>
                    </Row>
                  </div>
                  <div className='col-5'>
                    <Row style={{ border: '1px solid #707070', borderRadius: '3rem' }}>
                      <div
                        className='col-6'
                        style={{ borderRight: '0.5px solid #707070', margin: '1rem 0px 1rem 0px', textAlign: 'center' }}
                      >
                        {sectorAllocations ? (
                          <div style={{}}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{`₹ ${findSum(
                              sectorAllocations
                            )}`}</div>
                            <div style={{ fontSize: '16px', marginBottom: '0.7rem', fontWeight: '550' }}>
                              Portfolio Size
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className='col-6'
                        style={{ borderLeft: '0.5px solid #707070', margin: '1rem 0px 1rem 0px', textAlign: 'center' }}
                      >
                        {sectorAllocations ? (
                          <div style={{}}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{`₹ ${findSum(
                              sectorAllocations
                            )}`}</div>
                            <div style={{ fontSize: '16px', marginBottom: '0.7rem', fontWeight: '550' }}>
                              Portfolio Size
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </Row>
                  </div>
                </Row>
                <div>
                  <div style={{ margin: '0.5rem 0.5rem 0.5rem 0px' }}>
                    {props.signinData ? (
                      props.analystDetails && props.analystDetails.user.user_id === analyst_id ? null : (
                        <Button
                          variant='outlined'
                          fullWidth
                          style={{
                            height: '30px',
                            textTransform: 'none',
                            padding: '2px',
                            color: '#2962ff',
                            borderColor: '#2962ff'
                          }}
                          onClick={() => {
                            follow(props && props.analystsForSubscriptionDetails.analyst_info.user.user_id);
                          }}
                        >
                          {followed === true ? 'Unfollow' : 'Follow'}
                        </Button>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <Col style={{ margin: '1.5rem 0px 2rem 0px', fontSize: '14px' }}>
              {props.analystsForSubscriptionDetails ? (
                props.analystsForSubscriptionDetails.analyst_info ? (
                  props.analystsForSubscriptionDetails.analyst_info.trading_experience ? (
                    <Row style={{ marginBottom: '2rem' }}>
                      <div
                        className='col-2'
                        style={{ padding: '0px', fontSize: '16px', marginBottom: '0.7rem', opacity: '0.8' }}
                      >
                        <i>Trading Experience</i>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className='col-6' style={{ fontSize: '16px' }}>
                        {`${props.analystsForSubscriptionDetails.analyst_info.trading_experience} years`}
                      </div>
                    </Row>
                  ) : null
                ) : null
              ) : (
                ''
              )}

              {props.analystsForSubscriptionDetails ? (
                props.analystsForSubscriptionDetails.analyst_info ? (
                  props.analystsForSubscriptionDetails.analyst_info.education ? (
                    <Row style={{ marginBottom: '2rem' }}>
                      <div
                        className='col-2'
                        style={{
                          padding: '0px',
                          fontSize: '16px',
                          marginBottom: '0.7rem',
                          opacity: '0.8',
                          width: '4rem'
                        }}
                      >
                        <i>Educational</i>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className='col-6' style={{ fontSize: '16px' }}>
                        {props.analystsForSubscriptionDetails.analyst_info.education}
                      </div>
                      {props.analystsForSubscriptionDetails.analyst_info.sebi_registered ? (
                        props.analystsForSubscriptionDetails.analyst_info.sebi_registered === true ? (
                          <div style={{ fontSize: '16px', opacity: '0.8' }}>
                            {`Reg No: ${props.analystsForSubscriptionDetails.analyst_info.sebi_registration_number}`}
                          </div>
                        ) : null
                      ) : null}
                    </Row>
                  ) : null
                ) : null
              ) : (
                ''
              )}

              {props.analystsForSubscriptionDetails ? (
                props.analystsForSubscriptionDetails.analyst_info ? (
                  props.analystsForSubscriptionDetails.analyst_info.work_experience ? (
                    props.analystsForSubscriptionDetails.analyst_info.work_experience.length > 0 ? (
                      <Row style={{ marginBottom: '2rem' }}>
                        <div
                          className='col-2'
                          style={{
                            padding: '0px',
                            fontSize: '16px',
                            marginBottom: '0.7rem',
                            opacity: '0.8',
                            width: '4rem'
                          }}
                        >
                          <i>Work Experience</i>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className='col-6'>
                          {props.analystsForSubscriptionDetails.analyst_info.work_experience.map((exp, i) => {
                            return (
                              <span style={{ fontSize: '16px' }} key={i}>
                                {`${exp.position} at ${exp.position}`} &nbsp;|&nbsp;
                              </span>
                            );
                          })}
                        </div>
                      </Row>
                    ) : null
                  ) : null
                ) : null
              ) : (
                ''
              )}

              <Row style={{ marginBottom: '2rem' }}>
                <div
                  className='col-2'
                  style={{ padding: '0px', fontSize: '16px', marginBottom: '0.7rem', opacity: '0.8' }}
                >
                  <i>
                    About &nbsp;
                    {props.analystsForSubscriptionDetails
                      ? props.analystsForSubscriptionDetails.analyst_info
                        ? props.analystsForSubscriptionDetails.analyst_info.user.name
                          ? props.analystsForSubscriptionDetails.analyst_info.user.name.substr(
                              0,
                              props.analystsForSubscriptionDetails.analyst_info.user.name.indexOf(' ')
                            )
                          : ''
                        : ''
                      : ''}
                  </i>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className='col-6' style={{ fontSize: '16px' }}>
                  <div style={{ fontSize: '16px', opacity: '0.8', lineHeight: '1.5' }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: props.analystsForSubscriptionDetails
                          ? props.analystsForSubscriptionDetails.analyst_info
                            ? props.analystsForSubscriptionDetails.analyst_info.about
                              ? props.analystsForSubscriptionDetails.analyst_info.about
                              : ''
                            : ''
                          : ''
                      }}
                    />
                  </div>
                </div>
              </Row>
            </Col>
          </div>
        ) : (
          <Loading open={true} />
        )
      ) : (
        <Loading open={true} />
      )}
    </>
  );
};

export default Bio;
