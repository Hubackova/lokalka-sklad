import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ color, type, icon, children, className, ...props }) => {
  return (
    <button className={`btn btn-${color} ${className}`} type={type} {...props}>
      {icon && <i className={`fa fa-${icon}`} />}
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.node,
  text: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  color: "green",
  type: "text"
};

export default Button;
