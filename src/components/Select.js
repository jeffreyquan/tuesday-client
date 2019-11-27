import React from 'react'
import { Select, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



const SelectWrap = (props) => {
  return(
    <FormControl className={useStyles().formControl} variant="outlined" >
      <Select
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className={useStyles().selectEmpty}
        displayEmpty
        >
        <MenuItem value="">{props.placeholder}</MenuItem>
        {props.options.map(option => {
          return(
            <MenuItem
              key={option}
              value={option}
              label={option}>{option}
              </MenuItem>
          );
        })}
        </Select>
    </FormControl>)
}


export default SelectWrap;
