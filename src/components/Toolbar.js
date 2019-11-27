import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {Drawer, Button as ButtonUI, TextField, Input as InputUI, InputBase, ThemeProvider } from '@material-ui/core';
import { fade, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { pink, green, blue, red, yellow, HUE } from '@material-ui/core/colors';

import Team from './Team'


function Toolbar(props){
    const [memberDropdown, setMemberDropdown] = useState(false)
    const [right, setRight] = useState(false);

    const toggleDrawer = () => {
        setRight(!right)
      }

    const Style = styled.div`
    width: 100%;
    height: 200px;
    padding: 1em;
    border-bottom: 1px solid lightgrey;
    display: flex;
    justify-content: space-between;
    `;

    const ListWrapper = styled.div`
    display: inline-flex;
    item-align: center;
    padding: 0 1em;
    margin: 0.5em 0;

    &:hover {
        color: #0088E1;
        cursor: pointer;
    }
    `;
    const theme = createMuiTheme({
      palette: {
        primary: blue,
        secondary: yellow,
      },
      status: {
        danger: red,
      },
    });


    const IconContainer = styled.button`
    border-radius: 25px;
    width: 40px;
    height: 40px;
    font-weight: 700;
    font-size: 20px;
    background-color: transparent;
    border: none;
    margin-left: 1em;
    vertical-align: center;
    item-align: center;
    text-alignment: center;

    &:hover {
        background-color:#EDEEF0;
    }
    `;

    const StyledButtonUI = withStyles({
        root: {
            background: 'linear-gradient(90deg, #3EB2F9 10%, #009AFF 90%)',
            borderRadius: 25,
            border: 0,
            color: 'white',
            padding: '5px 1em',
            boxShadow: '0 0 1px rgba(255, 105, 135, .3)',
            margin: '0 1em'
        },
        label: {
            textTransform: 'capitalize',
            fontWeight: 800
        },
    })(ButtonUI);

    const StyledInput = withStyles(theme => ({
      root: {
        'label + &': {
          marginTop: theme.spacing(3),
        },
      },
      input: {
        borderRadius: 25,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
          boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.primary.main,
        },
      },
    }))(InputBase);


    return(
        <ThemeProvider theme={theme}>
        <Style>
        <div>
        <h2>Project</h2>
        <textarea>Description</textarea>
        </div>
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'flex-end', }}>
        <div style={{display: 'inline-block', border: '1px solid lightgrey', borderRadius: '4px'}}>
        <ListWrapper style={{borderRight: '1px solid lightgrey'}} onClick={toggleDrawer}><PeopleAltOutlinedIcon /><span> Members / </span><span> 3 </span></ListWrapper>
        <ListWrapper><FormatListBulletedOutlinedIcon /> <span>Tasks / </span><span> 10 </span></ListWrapper>
        </div>
        <IconContainer><MoreHorizOutlinedIcon /></IconContainer>
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-end', }}>
        <StyledButtonUI color="primary">New Task</StyledButtonUI>
        <StyledInput placeholder='Search' id="bootstrap-input"  />
        <IconContainer><VisibilityOffOutlinedIcon /></IconContainer>
        <IconContainer><FilterListOutlinedIcon /></IconContainer>
        <IconContainer><AccountCircleOutlinedIcon /></IconContainer>

        </div>
        </div>
        <Drawer anchor="right" open={right} onClose={toggleDrawer}><Team style={{position:'relative'}} /></Drawer>
        </Style>
        </ThemeProvider>
    )
}

export default Toolbar
