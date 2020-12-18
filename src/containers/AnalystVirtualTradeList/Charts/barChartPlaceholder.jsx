import React from 'react'
import PropTypes from 'prop-types'
import '../AnalystVirtualDetail.scss';
import Alert from 'react-bootstrap/Alert'

function BarChartPlaceholder(props) {
  return (
    <div className="loader chart-placeholder">
    <div className="animated-bg">
      <div className="bg-mask a"></div>
      <div className="bg-mask b"></div>
      <div className="bg-mask c"></div>
      <div className="bg-mask d"></div>
      <div className="bg-mask e"></div>
      <div className="text">
        <Alert variant="info">
          No data yet!
        </Alert>
      </div>
    </div>
  </div>
  )
}

BarChartPlaceholder.propTypes = {

}

export default BarChartPlaceholder

