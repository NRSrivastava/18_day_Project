import React from 'react';
import Header from './header';
import LeftSection from './leftSection';
//import MiddleSection from './middleSection';
import RightSection from './rightSection';
import "./page.css"

class FullPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <Header/>
            <LeftSection/>
            <RightSection/>
            </>
        );
    }
}

export default FullPage;