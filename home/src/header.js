import React from 'react';
import "./header.css";
import { Avatar } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="header">
                <div class="left">
                    <img src="logo.png" alt="MyThreads"  style={{height:'100%'}} class="clickable"/>
                </div>
                <div class ="middle">
                <TextField id="searchBox"
                    label="Search"
                    // variant="filled"
                    fullWidth='true'
                    InputProps={{
                        endAdornment: (
                        <InputAdornment>
                            <IconButton>
                            <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                    />
                </div>
                <div class ="right">
                    <div class="clickable" style={{display:'flex'}}>
                        <Avatar style={{margin:'10px'}}/>
                        <h4>Sign In</h4>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Header;