import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../redux/actions/index';

import PortfolioEdit from './PortfolioEdit';
import PortfolioDisplay from './PortfolioDisplay';

function AnanlystPortfolioAllocationBrowser(props) {
  const [editPage, setEditPage] = React.useState(true);

  React.useEffect(() => {
    const allocationComplete =
      props && props.analystDetails
        ? props.analystDetails.segment_list
          ? Object.keys(props.analystDetails.segment_list).length > 0
            ? true
            : false
          : false
        : false;

    allocationComplete ? setEditPage(false) : setEditPage(true);
  }, [props.analystDetails]);

  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props, editPage);

  return <div>{editPage ? <PortfolioEdit setEditPage={setEditPage} /> : <PortfolioDisplay />}</div>;
}

const mapStateToProps = state => ({
  analystDetails: state.analyst.analystDetails,
  message: state.auth.message,
  signinData: state.auth.signinData
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnanlystPortfolioAllocationBrowser));
