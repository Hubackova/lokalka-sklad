import React from 'react';
import PropTypes from 'prop-types';
import "./Input.scss";

const Input = ({handleChange, label, value, type, disabled, ...props}) => {
    return (
        <div className="input">
            <label>{label}</label>
            <input value={value} onChange={handleChange} type={type} disabled={disabled} {...props}/>
        </div>
    );
};

export default Input;

Input.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
  };

  Input.defaultProps = {
    label: "",
    type: "text",
    disabled: false,
  };