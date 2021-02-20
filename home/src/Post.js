import React, { Component } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from "@material-ui/core/IconButton";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import store from './store';

class Post extends Component {
    constructor({props}){
        super(props);
        this.state={"poster_display":"none","likes":0,"dislikes":0,"like":{},"dislike":{},"upordown":""};
        this.likeDislike=this.likeDislike.bind(this);
    }
    componentDidMount(){
        this.unsub=store.subscribe(()=>{
            this.setState({'poster_display':(store.getState().signedIn?"flex":'none')});
        });
        //console.log(this.props.likes+" "+this.props.dislikes);
        if(this.props.upordown=='u')
        this.setState({"like":{color:"SeaGreen"}});
        if(this.props.upordown=='d')
        this.setState({"dislike":{color:"#ca212e"}});
        this.setState({"likes":this.props.likes,"dislikes":this.props.dislikes,"upordown":this.props.upordown});
    }
    // UNSAFE_componentWillReceiveProps(){
    //     console.log(this.state.likes+" "+this.state.dislikes+"<------(");
    //     console.log(this.props.likes+" "+this.props.dislikes);
    //     if(this.props.upordown=='u')
    //     this.setState({"like":{color:"SeaGreen"}});
    //     if(this.props.upordown=='d')
    //     this.setState({"dislike":{color:"#ca212e"}});
    //     this.setState({"likes":this.props.likes,"dislikes":this.props.dislikes});
    //     console.log(this.state.likes+" "+this.state.dislikes+"<------");
    // }
    componentWillUnmount(){
        this.unsub();
    }
    likeDislike(proposed,current) {
        if(!store.getState().signedIn){
            window.alert("You need to Sign in");
        }
        if((proposed!='u'&&proposed!='d'&&proposed!='')||(current!='u'&&current!='d'&&current!='')){
            console.log("unknown");
            return;}
        if(proposed==current){
            console.log("same same");
            let xhrr = new XMLHttpRequest();
            xhrr.open('PUT', 'https://ec2-52-206-109-241.compute-1.amazonaws.com/team2practo/posts/uord');
                xhrr.setRequestHeader('content-type','application/json'); 
                xhrr.setRequestHeader('authorization',store.getState().accessToken);
            xhrr.onload = ()=> {
            console.log("--------> " + xhrr.responseText);
            };
            xhrr.send('{    "post_id":'+this.props.id+',    "upordown":""}');
            if(proposed=='u'){
                this.setState((prevState)=>({likes:prevState.likes-1,like:{},upordown:''}));
            }else{
                this.setState((prevState)=>({dislikes:prevState.dislikes-1,dislike:{},upordown:''}));
            }
            return;
        }
        let xhrr = new XMLHttpRequest();
        xhrr.open('PUT', 'https://ec2-52-206-109-241.compute-1.amazonaws.com/team2practo/posts/uord');
                xhrr.setRequestHeader('content-type','application/json'); 
                xhrr.setRequestHeader('authorization',store.getState().accessToken);
        xhrr.onload = ()=> {
            console.log("--------> " + xhrr.responseText);
        };
        xhrr.send('{    "post_id":'+this.props.id+',    "upordown":"'+proposed+'"}');
        console.log(current);
            if(current==''){
                if(proposed=='u'){
                    this.setState((prevState)=>({likes:prevState.likes+1,like:{color:"SeaGreen"},upordown:'u'}));
                    //console.log("u1 "+proposed+".");
                }
                else{
                    this.setState((prevState)=>({dislikes:prevState.dislikes+1,dislike:{color:"#ca212e"},upordown:'d'}));
                    //console.log("d1 "+proposed+".");
                }
            }
            else{
                if(proposed=='u'){
                    this.setState((prevState)=>({likes:prevState.likes+1,dislikes:prevState.dislikes-1,like:{color:"SeaGreen"},dislike:{},upordown:'u'}));
                    //console.log("u2 "+proposed+".");
                }
                else{
                    this.setState((prevState)=>({dislikes:prevState.dislikes+1,likes:prevState.likes-1,dislike:{color:"#ca212e"},like:{},upordown:'d'}));   
                    //console.log("d2 "+proposed+".");
                }
            }
        
    }
    render() {
        return (
            <div className="post">
                <div className="post_vote_section">
                    <IconButton onClick={()=>{this.likeDislike('u',this.state.upordown)}}>
                        <ThumbUpIcon fontSize="small" style={this.state.like}/>
                    </IconButton>
                    <h4 style={{margin:0}}>{this.state.likes-this.state.dislikes}</h4>
                    <IconButton onClick={()=>{this.likeDislike('d',this.state.upordown)}}>
                        <ThumbDownIcon fontSize="small" style={this.state.dislike}/>
                    </IconButton>
                </div>
                <div>
                    <div className="post_poster" style={{display:this.state.poster_display}}>
                        <Avatar className="avaAvatar" src={this.props.profilePic} style={{margin:"3px",height:"24px",width:"24px"}}/>
                        <span className="post_poster_username">{this.props.username}</span>
                        <span className="post_poster_time">at {this.props.date}</span>
                    </div>
                    <div className="post_title">
                        <h4>{this.props.title}</h4>
                    </div>
                    <img src={this.props.image} style={{margin:"5px",maxHeight:"300px",maxWidth:'100%'}}/>
                    <div className="post_details">{this.props.details}</div>
                </div>
            </div>
        );
    }
}

export default Post;