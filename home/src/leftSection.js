import React from 'react';
import SideBarRow from './sideBarRow';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ChatIcon from '@material-ui/icons/Chat';
import Trophy from './trophy.js';
import "./leftSection.css";
import store from './store';
import {rfreshPost} from './api';
import User from './user';



class leftSection extends React.Component{
    constructor(props){
        super(props);
        this.state={buttonArray:[]};
        this.buttonActive=this.buttonActive.bind(this);
    }
    buttonActive(but){
        //console.log(but);
        store.dispatch({type:'postTypeChange',payload:but});
        if(!rfreshPost())
        return;
        //console.log(but);
        this.state.buttonArray.forEach(element => {
            element.style.backgroundColor="transparent";
        });
        switch(but.charAt(0)){
            case 'n':
                this.state.buttonArray[0].style.backgroundColor="darkgrey";
            break;
            case 'p':
                this.state.buttonArray[1].style.backgroundColor="darkgrey";
            break;
            case 't':
                this.state.buttonArray[2].style.backgroundColor="darkgrey";
            break;
            case 'm':
                this.state.buttonArray[3].style.backgroundColor="darkgrey";
            break;
            default:;
        }
    }
    componentDidMount(){
        this.setState({buttonArray:[document.getElementById("sbr_new"),document.getElementById("sbr_popular"),document.getElementById("sbr_trending"),document.getElementById("sbr_me")]});
        this.unsub=store.subscribe(()=>{
            if(!store.getState().signedIn){
                this.state.buttonArray.forEach(element => {
                    element.style.backgroundColor="transparent";
                });
                document.getElementById("sbr_new").style.backgroundColor="darkgrey";
            }
        });
    }
    componentWillUnmount(){
        this.unsub();
    }
    render(){
        return(
        <div className="leftSection">
            <div className="sidebar" >
                <SideBarRow title="New" Icon={FiberNewIcon} id="sbr_new" clickMe={()=>{this.buttonActive("new")}}/>
                <SideBarRow title="Popular" Icon={WhatshotIcon} id="sbr_popular" clickMe={()=>{this.buttonActive("popular")}}/>
                <SideBarRow title="Trending" Icon={TrendingUpIcon} id="sbr_trending" clickMe={()=>{this.buttonActive("trending")}}/>
                <SideBarRow title="My Posts" Icon={ChatIcon} id="sbr_me" clickMe={()=>{this.buttonActive("me")}}/>
            </div>
            <div className="leaderboard" >
                <div className="heading">
                    <span className="icon"><Trophy/></span>
                    <h4>Leader Board</h4>
                </div>
                <User/>
            </div>
        </div>
        );
    }
}

export default leftSection;