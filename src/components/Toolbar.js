import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

function Toolbar(props){

    const Style = styled.div`
        width: 100%;
        height: 20vh;
        padding: 1em;
        border-bottom: 1px solid lightgrey;
        display: flex;
        justify-content: space-between;
        `;

    return(
        <Style>
        <div>
            <h2>Project</h2>
            <p>Description</p>
        </div>
        <div>
            <div>
                <div>
                <span><PeopleAltOutlinedIcon /> </span><span> / 3 </span>
                </div>
            </div>
            <div>
            </div>
        </div>
        </Style>
    )
}

export default Toolbar
