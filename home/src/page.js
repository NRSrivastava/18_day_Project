import React from 'react';
import Header from './header';
import LeftSection from './leftSection';
import MiddleSection from './middleSection';
import RightSection from './rightSection';

class FullPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Header/>
                <div style={{margin:"20px 0px",display:'flex',flexDirection:"row"}}>
                <LeftSection/>
                <MiddleSection/>
                <RightSection/>
                </div>
            </div>
        );
    }
}

export default FullPage;