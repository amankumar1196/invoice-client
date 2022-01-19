import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "./Toastr.css";
import { clearToastr } from '../../redux/actions/ToastrMessageActions';

const Toastr = (props) => {
  const { alerts, dispatch } = props
  
  const getIcon = (type) => {
      switch(type) {
        case "success": return "check-circle"
        case "danger": return "error-circle"
        case "warning": return "error"
        default: return "info-circle"
      }
  } 
  const getColor = (type) => {
    switch(type) {
      case "success": return "#04AA6D"
      case "danger": return "#e03516"
      case "warning": return "#edbc1c"
      default: return "#187df0"
    }
} 
  return (
    <div className="alert-wrapper">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          <div className="d-flex align-items-center">
            {<i class={`bx bx-${getIcon(alert.alertType)} fs-20 mr-8`}></i>}
            {alert.msg}
          </div>
          <i className="bx bx-x close" onClick={() => dispatch(clearToastr(alert.id))}></i>
          <div className="toastr-progress">
            <div className="toastr-bar" style={{backgroundColor: getColor(alert.alertType)}}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

Toastr.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.toastrMessage
});

export default connect(mapStateToProps)(Toastr);