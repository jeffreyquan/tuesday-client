import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import {Drawer, Button as ButtonUI, TextField, Input as InputUI } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Team from './Team'


function Toolbar(props){
    const [memberDropdown, setMemberDropdown] = useState(false)
    const [right, setRight] = useState(false);

    const toggleDrawer = () => {
        setRight(!right)
      }

    const Style = styled.div`
    width: 100%;
    height: 150px;
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
        color: rgba(0, 136, 225, 1);
        cursor: pointer;
    }
    `;

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

    const StyledTextField = withStyles({
        root: {
            '& input:valid + fieldset': {
                borderColor: 'lightgrey',
                borderWidth: 1,
                borderRadius: 25,
                height: 41,
            },
            '& input:valid:focus + fieldset': {
                borderColor: 'lightgrey',
                borderLeftWidth: 6,
                borderRadius: 25,
                padding: '4px !important', // override inline-style
            },
        },
        label: {
            fontWeight: 800,
            color: 'lightgrey',
        },
    })(TextField);

    return(
        <Style>
        <div>
        <h2>Project</h2>
        <p>Description</p>
        </div>
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <div>
        <div style={{display: 'inline-block', border: '1px solid lightgrey', borderRadius: '4px'}}>
        <ListWrapper style={{borderRight: '1px solid lightgrey'}} onClick={toggleDrawer}><PeopleAltOutlinedIcon /><span> Members / </span><span> 3 </span></ListWrapper>
        <ListWrapper><FormatListBulletedOutlinedIcon /> <span>Tasks / </span><span> 10 </span></ListWrapper>
        </div>
        <IconContainer><MoreHorizOutlinedIcon /></IconContainer>
        </div>
        <Drawer anchor="right" open={right} onClose={toggleDrawer}><Team style={{position:'relative'}} /></Drawer>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <form>
        <StyledTextField id="outlined-basic" label="Search" variant="outlined" />
        <StyledButtonUI color="primary">Search</StyledButtonUI>
        </form>
        </div>
        </div>
        </Style>
    )
}

export default Toolbar
