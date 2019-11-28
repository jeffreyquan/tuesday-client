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
    paddingLeft: theme.spacing(2),
  },
  selectOption: {

  }
}));


const colorList = {yellow:'rgba(251, 194, 122, 0.5)', red:'rgba(225, 68, 92, 0.5)', green: 'rgba(1, 200, 117, 0.5)', blue:'rgba(87, 155, 252, 0.5)', grey:'rgba(149, 149, 149, 0.5)'}



const statusColor = (value) => {
    switch (value) {
        case 'Done':
            return colorList.green;
        case 'Working On It':
        case 'Medium':
            return colorList.yellow;
        case 'Stuck':
        case 'High':
            return colorList.red;
        case 'Low':
            return colorList.blue;
        default:
              return "transparent";
    }
}

const SelectWrap = (props) => {
  return(
    <FormControl className={useStyles().formControl}>
      <Select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={useStyles().selectEmpty}
        displayEmpty
        disableUnderline
        style={{backgroundColor: statusColor(props.value)}}
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
