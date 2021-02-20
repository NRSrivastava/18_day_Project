import store from './store';

export function Posts(accessToken="",postType='public'){
    let link='https://ec2-52-206-109-241.compute-1.amazonaws.com/team2practo/posts/';
    fetch(link+postType,{
    method:"GET",credentials:"include",headers:{
        "Content-type":"application/json;charset=UTF-8",
        "authorization":accessToken
    }}).then(response=>{
        response.json().then(data=>{
        store.dispatch({
            type:"posts_replace",
            payload:data
        });
        //console.log(data);
        }).catch(error=>{
        console.log("error 2 "+error)
        })}).catch(error=>{
        console.log("error 1 "+error)
        });
}

export function rfreshPost(){
        let state = store.getState();
        let s=state.signedIn;
        if(s){
            switch(state.postType){
                case 'new':
                    Posts(state.accessToken,"");
                    break;
                case 'popular':
                    Posts(state.accessToken,"popular");
                    break;
                case 'trending':
                    Posts(state.accessToken,"trending");
                    break;
                case 'me':
                    Posts(state.accessToken,"me");
                    break;
                default:
                    Posts(state.accessToken,"popular");
            }
        }
        else{
            Posts();
        }
        console.log(s);
        return state.signedIn;
}
