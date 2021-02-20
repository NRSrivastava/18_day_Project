import React from 'react';
import "./header.css";
import { Avatar } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import AddBoxIcon from '@material-ui/icons/AddBox';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import store from './store';
import {rfreshPost,Posts} from './api';

let responseGoogleSuccess = (response) => {
        console.log(response);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://ec2-52-206-109-241.compute-1.amazonaws.com/team2practo/auth/api/oauth/');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
          console.log('Signed in as: ' + xhr.responseText);
          let res=JSON.parse(xhr.responseText);
            store.dispatch({
                type:'userLogin',
                payload:{
                    'signedIn':true,'name':res.name,"user_image":res.image_link,"points":res.points,"accessToken":res.accessToken
                }
            });
            Posts(res.accessToken,'');
        };
        xhr.send('idtoken=' + response.tokenId);
    }

let responseGoogleFail = (response)=>{
    console.log(response);
}

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={'name':"Sign In","user_image":"","points":"","accessToken":"","logout_display":"none","login_func":true};
    }
    componentDidMount(){
        this.unsub=store.subscribe(()=>{
            let x=store.getState();
            this.setState({'name':x.name,"user_image":x.user_image,"points":x.points,"accessToken":x.accessToken});
        });
    }
    componentWillUnmount(){
        this.unsub();
    }
    render(){
        return(
            <div className="header">
                <div className="left">
                    <img src="logo.png" alt="MyThreads"  style={{height:'100%'}} className="clickable"/>
                </div>
                <div className ="middle">
                    <div className="clickable" style={{display:'flex',alignItems:"center",justifyContent:"space-around"}}>
                        <AddBoxIcon fontSize="large" style={{margin:"0 0 0 5px",fill:"#ca212e"}}/>
                        <h4 style={{margin:"0px 8px 0 5px"}}>Add Post</h4>
                    </div>
                    {/* <TextField id="searchBox"
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
                        /> */}
                </div>
                <div className ="right">
                        <div className="clickable" style={{display:'flex',alignItems:"center"}} onClick={()=>{if(this.state.login_func){document.getElementById("googleLoginButton").click()}}}>
                            <Avatar src={this.state.user_image} style={{margin:'10px'}}/>
                            <h4 style={{marginRight:"10px",wordBreak:'break-all'}}>{this.state.name}</h4>
                        </div>
                        <GoogleLogin
                            clientId="752169556635-q0u04asvqip10b7kcckntcfcltm6ek39.apps.googleusercontent.com"
                            render={renderProps => (
                                <button id="googleLoginButton" onClick={renderProps.onClick} disabled={renderProps.disabled} style={{display:'none'}}>This is my custom Google button</button>
                                /* <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button> */
                            )}
                            buttonText="Login"
                            onSuccess={res=>{responseGoogleSuccess(res);this.setState({"logout_display":"flex","login_func":false})}}
                            onFailure={responseGoogleFail}
                            cookiePolicy={'single_host_origin'}
                            />
                            <GoogleLogout
                                clientId="752169556635-q0u04asvqip10b7kcckntcfcltm6ek39.apps.googleusercontent.com"
                                buttonText="Logout"
                                render={renderProps => (
                                    <>
                                        <div className="clickable" style={{display:this.state.logout_display,alignItems:"center",height:"20px"}} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            <h5 style={{marginLeft:"10px",marginRight:"10px",marginBottom:"10px",marginTop:"10px"}}>Logout</h5>
                                        </div>
                                    </>
                                )}
                                onLogoutSuccess={()=>{
                                    fetch("https://ec2-52-206-109-241.compute-1.amazonaws.com/team2practo/auth/api/logout",{
                                        method:"DELETE",credentials:"include",headers:{"Content-type":"application/json;charset=UTF-8",
                                        "Authorization":this.state.accessToken
                                    }}).then(response=>{
                                        response.json().then(data=>{
                                            store.dispatch({
                                                type:'userLogout'
                                             });
                                             this.setState({"logout_display":"none",login_func:true});
                                             rfreshPost();
                                            console.log(data);
                                        }).catch(error=>{
                                            console.log("error 2 "+error)
                                        })
                                    }).catch(error=>{
                                        console.log("error 1 "+error)
                                    });
                                }}
                                >
                            </GoogleLogout>
                </div>
            </div>
            
        );
    }
}

export default Header;