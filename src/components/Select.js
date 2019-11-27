import React from 'react'

const Select = (props) => {
  console.log(props, 'props');
  
  return(
    <div className="form-group">
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        >
        <option value="">{props.placeholder}</option>
        {props.options.map(option => {
          return(
            <option
              key={option}
              value={option}
              label={option}>{option}
              </option>
          );
        })}
        </select>
    </div>)
}

export default Select;