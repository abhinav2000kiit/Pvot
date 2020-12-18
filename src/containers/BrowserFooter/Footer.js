import React from 'react';
import { Link } from 'react-router-dom';
// import { animateScroll as scroll } from 'react-scroll';

import logo from '../../assets/logo/logo.png';
import PlaystoreButton from '../../assets/images/playstoreButton.png';
import gotoTop from '../../assets/images/gotoTop.png';
import copyright from '../../assets/images/Copyright.svg';
import './Footer.scss';

const Footer = () => {
  // const scrollToTop = () => {
  //   scroll.scrollToTop();
  // };

  return (
    <div style={{ padding: '0 5rem' }}>
      {/* <!-- Ninth Section --> */}
      <div style={{ marginTop: '10rem' }}>
        <div
          className='row'
          style={{
            borderRadius: '2rem',
            boxShadow: '0.5rem 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.25)',
            padding: '2rem 1rem'
          }}
        >
          <div className='col-4 align-self-center' style={{ paddingRight: '7rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Link to='/'>
                <img src={logo} height='79' width='90' id='logo' alt='logo' />
              </Link>
            </div>
            <div
              className='text-center'
              style={{
                marginTop: '1rem'
              }}
            >
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '400'
                }}
              >
                Contact us on{' '}
              </span>
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '700'
                }}
              >
                hello@pvot.in
              </span>
            </div>
          </div>
          <div className='col-4 text-center align-self-center'>
            <div style={{ fontWeight: '700' }}>Try Pvot for free.</div>
            <a
              className='btn p-0'
              href='https://play.google.com/store/apps/details?id=in.pvot'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={PlaystoreButton} alt='playstoreButton' className='playstoreButton' height='70' />
            </a>
          </div>
          <div className='col-4 align-self-center'>
            <div className='row'>
              <div className='col-auto'></div>
              <div className='col-5'>
                <div className='ninthSectonRightHeading mb-2'>
                  <span className='highlightLg'>Company</span>
                </div>
                <a href='https://www.pvot.in/why-pvot' className='ninthSectionLinks'>
                  Why Pvot
                </a>
              </div>
              <div className='col-5'>
                <div className='ninthSectonRightHeading mb-2'>
                  <span className='highlightLg'>Service</span>
                </div>
                <a href='https://www.pvot.in/get-help' className='ninthSectionLinks'>
                  Get Help
                </a>
                <br />
                <a href='https://www.pvot.in/refund-policy' className='ninthSectionLinks'>
                  Refund Policy
                </a>
                <br />
                <a href='https://www.pvot.in/terms-of-use' className='ninthSectionLinks'>
                  Terms of Use
                </a>
                <br />
                <a href='https://www.pvot.in/privacy-policy' className='ninthSectionLinks'>
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Tenth Section --> */}
      <div
        style={{
          marginTop: '5rem',
          marginBottom: '4rem',
          padding: '0 4rem'
        }}
      >
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-4 text-center my-auto'>
            {/* <a
                            className="bottomLink mx-3"
                            href="http://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook-square socialIcons"></i>
                        </a> */}
            <a
              href='https://twitter.com/pvotofficial'
              className='bottomLink mx-3'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-twitter socialIcons'></i>
            </a>
            <a href='http://linkedin.com' className='bottomLink mx-3' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin-in socialIcons'></i>
            </a>
            <a href='https://t.me/pvotofficial' className='bottomLink mx-3' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-telegram socialIcons'></i>
            </a>
            <a
              href='https://medium.com/@pvotofficial'
              className='bottomLink mx-3'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-medium mx-auto socialIcons'></i>
            </a>
          </div>
          {/* <div
            className='col-4 text-right my-auto'
            // onClick={() => (document.documentElement.scrollTop = 0)}
            onClick={scrollToTop}
          >
            <img
              src={gotoTop}
              alt='gotoTop'
              height='42'
              width='42'
              style={{
                cursor: 'pointer'
              }}
            />
          </div> */}
        </div>
        <div className='row mt-3'>
          <div className='m-auto'>
            <div className='my-auto'>
              {/* <span
                className="mx-1"
                style={{ color: "#2b2b2b", margin: "0 0.5rem" }}
              >
                {"\u00a9"}
              </span> */}
              <img src={copyright} alt='copyright' width='14' height='14' />
              <span style={{ fontSize: '0.8rem' }}> 2020 EffiFront Tech Pvt Ltd. Bangalore, Karnataka.</span>
            </div>
            <div className='text-center' style={{ fontSize: '0.8rem' }}>
              All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
