import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ButtonBasesLoggedIn from './ButtonBasesLoggedIn';
import { ReactComponent as Logo } from './Logo.svg';


class MainPageLoggedIn extends Component{
  
  
  render(){
      return(

        
        <div>
           <div style={{marginBottom : '0px'}}>
            <Header color='info' style={{position:"static"}} transparent leftLinks={<Link to='/user'><div style={{height:'70px',width: '100px' }}>
              <Logo />
             </div></Link>} rightLinks={<HeaderLinksLoggedIn/>} fixed/>
          </div>
            <Parallax filter image={require('../assets/img/plane-wallpaper.jpg').default} children={<div style = {{position: 'relative',top: '-200px'}} className={'mainPageHeader'}><h1>Welcome to our AirlineZ!</h1><h3>where quality meets excellence</h3></div>}/>
            <div style={{position: 'relative',top: '-350px',height:"20px"}}>
            <Card style={{margin: 'auto', maxWidth: 750}}>
              <CardBody style={{margin : '-10px'}}> 
                <ButtonBasesLoggedIn/>
              </CardBody>
            </Card> 
            </div>   
                        

        </div>

      );
    }
  


}

export default MainPageLoggedIn ;