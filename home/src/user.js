import React from 'react';
import { Avatar } from '@material-ui/core';
import './user.css';

export default function User(props) {
    return(
        <div className="user" >
            <Avatar className="avaAvatar" src={props.profilePic} style={{margin:"3px",height:"24px",width:"24px"}}/>
            <span className="user_username">hello there{props.username}</span>
        </div>
    );
}