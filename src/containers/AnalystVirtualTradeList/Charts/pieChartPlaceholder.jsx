import React from 'react'
import PropTypes from 'prop-types'
import '../AnalystVirtualDetail.scss';
import Alert from 'react-bootstrap/Alert'

function PieChartPlaceholder(props) {
  return (
    <div className="loader chart-placeholder">
    <div className="animated-bg-pie">
       <div className="outer-circle"></div>
       <div className="inner-circle"></div>
      <div className="text">
        <Alert variant="info">
          No data yet!
        </Alert>
      </div>
    </div>
  </div>
  )
}

PieChartPlaceholder.propTypes = {

}

export default PieChartPlaceholder

