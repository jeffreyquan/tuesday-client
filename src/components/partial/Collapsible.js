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
        <div onClick={(e)=>togglePanel(e)} >
        <span>{props.title} </span><span> {icon} </span>
        </div>

        {open ? (<div> {props.children} </div>) : null}
        </div>
        )
}

export default Collapsible
