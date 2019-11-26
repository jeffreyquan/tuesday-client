import React, { useState } from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

function Collapsible(props) {
    const [open, setOpen] = useState(false)

    const togglePanel = (e) => {
        setOpen(!open)
    }

    let icon
    open ? icon = <RemoveRoundedIcon /> : icon = <AddRoundedIcon />


    return (
        <div>
        <div onClick={(e)=>togglePanel(e)} className='header'>
        {props.title} <span> {icon} </span>
        </div>
        <ul>
        {open ? (<li> {props.children} </li>) : null}
        </ul>
        </div>
        )
}

export default Collapsible
