import React from 'react';
import { Document, Page, View } from 'react-pdf/dist/entry.webpack';
import Header from '../components/Header/customHeader';
import BottomNavigator from '../components/BottomNavigator';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './UserManual.scss';
import user_manual from './user_manual.pdf';
import Grow from '@material-ui/core/Grow';
import Loading from '../Loading/Loading';

class UserManual extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <Grow in={true} timeout={500}>
        <div>
          <Header
            title={'User Manual'}
            className='manualHeader'
            backButton
            backTo={() => this.props.history.push('/')}
          />
          <Document file={user_manual} onLoadSuccess={this.onDocumentLoadSuccess} className='manualDoc'>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                wrap
                rotate={90}
                className='manualPage mb-5 p-3'
                width={350}
              />
            ))}
          </Document>
          <BottomNavigator />
        </div>
      </Grow>
    );
  }
}

export default UserManual;
