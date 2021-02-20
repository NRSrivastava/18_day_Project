import store from "./store";

//{'name':"Sign In","user_image":"","points":"","accessToken":""}
export default function reducer(state={signedIn:false,'name':"Sign In","user_image":"","points":"","accessToken":"",'posts':[],'postType':'public'},action){
    switch (action.type) {
        case 'userLogin':
            return {...state,signedIn:true,'name':action.payload.name,"user_image":action.payload.user_image,"points":action.payload.points,"accessToken":action.payload.accessToken,'postType':'new'};
        case 'userLogout':
            return{...state,signedIn:false,'name':"Sign In","user_image":"","points":"","accessToken":"",'postType':"public"}
        case 'postTypeChange':
            return{...state,postType:action.payload}
        case 'posts_add':
            return{...state,posts:[...state.posts,...action.payload]}
        case 'posts_replace':
            return{...state,posts:action.payload}
        default:
            return state;
    }
}