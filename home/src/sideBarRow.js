import React from 'react';
import "./sideBarRow.css";

function sideBarRow({Icon,title,clickMe,id}) {
    return (
        <div className="sideBarRow" onClick={clickMe} id={id}>
            <span className="icon"><Icon/></span>
            <h4>{title}</h4>
        </div>
    );
}

export default sideBarRow;