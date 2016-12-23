/**
 * Created by chandransh on 21/12/16.
 */
import './Input.css';
import React, { PropTypes } from 'react'

const Input = ({className, type, name, placeholder, maxLength, onKeyUp, min, max}) => (
    <span className="input">
      {(type=="number") ?
        <input className={className}
               type={type}
               name={name}
               placeholder={placeholder}
               autoComplete="on"
               required
               maxLength={maxLength}
               onKeyUp={onKeyUp}
               min={min}
               max={max}/>
        :
        <input className={className}
               type={type}
               name={name}
               placeholder={placeholder}
               autoComplete="on"
               required
               maxLength={maxLength}
               onKeyUp={onKeyUp}/>}
    </span>
);

Input.defaultProps = {
  type: "text"
};

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.string,
  onKeyUp: PropTypes.func
};

export default Input;