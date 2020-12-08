import React from 'react';
import './index.css';


const TextInput = props => (
  <div className="field">
    <input
      {...props}
      type="text"
    />
    <label htmlFor={props.id} >
      {props.placeholder}
    </label>
  </div>
);

export default TextInput;
