import React from 'react';
import Post from './Post';
import store from './store';
import './rightSection.css';
class rightSection extends React.Component{
    constructor(props){
        super(props);
        this.state={post:[]};
    }
    componentDidMount(){
        this.unsub=store.subscribe(()=>{
            let xyz=store.getState().posts;
            let arr=[];
                xyz.forEach(ele => {
                    //console.log("---->"+ele.upvotes+" "+ele.downvotes);
                    arr.push(
                        <Post id={ele.post_id} likes={ele.upvotes} dislikes={ele.downvotes} profilePic={ele.user_image} username={ele.name} date={ele.timeposted} title={ele.title} image={ele.image_link} details={ele.caption} upordown={ele.upordown}/>
                    );
                });
                this.setState({post:[]});
                this.forceUpdate();
                this.setState({post:arr});
        });
    }
    componentWillUnmount(){
        this.unsub();
    }
    render(){
        return(
        <div className="rightSection">
            {this.state.post}
        </div>);
    }
}

export default rightSection;