import React, { useState } from 'react';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import styled from 'styled-components';

function Collapsible(props) {
    const [open, setOpen] = useState(false)

    const togglePanel = (e) => {
        setOpen(!open)
    }

    let icon
    open ? icon = <CloseRoundedIcon /> : icon = <MenuRoundedIcon />

    const Title = styled.h1`
        fond-family: "Abel";
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;

    `;


    return (
        <div>
        <Title onClick={(e)=>togglePanel(e)} >
        <span>{props.title} </span><span> {icon} </span>
        </Title>

        {open ? (<div> {props.children} </div>) : null}
        </div>
        )
}

export default Collapsible
