import React from 'react'
import { Select, MenuItem, FormControl, ThemeProvider } from '@material-ui/core';
import { makeStyles,  createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  selectOption: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
  }
}));



const SelectWrap = (props) => {
  return(
    <FormControl className={useStyles().formControl}>
      <Select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
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
