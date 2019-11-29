import React, { useState } from 'react';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import styled from 'styled-components';

function Collapsible(props) {
    const status = props.open || false
    const [open, setOpen] = useState(status)

    const togglePanel = (e) => {
        setOpen(!open)
    }

    let icon
    open ? icon = <CloseRoundedIcon /> : icon = <MenuRoundedIcon />

    const color = open&&props.color ? "transparent" : props.color


    const Title = styled.h1`
        fond-family: "Abel";
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        background-color: ${props => props.color};
        margin-bottom: 0;
    `;


    return (
        <div style={{marginBottom: '4em'}}>
        <Title color={color} >
        <span>{props.title} </span><span onClick={(e)=>togglePanel(e)}> {icon} </span>
        </Title>

        {open ? (<div style={{marginBottom: "0"}}> {props.children} </div>) : null}
        </div>
        )
}

export default Collapsible
