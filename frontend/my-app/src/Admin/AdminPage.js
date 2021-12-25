import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;
import ButtonBases_Admin from './ButtonBases_Admin';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

class AdminPage extends Component{
  
  logout(){
    axios.post('http://localhost:8000/admin/logout')
                .then((result) => {
                  localStorage.removeItem('adminID')
                  localStorage.removeItem('isAdminLoggedIn')
                  window.location.href='/admin/login'
                                })
  
                .catch(error=>{
                  console.log(error)
                })
  }
  
  render(){
      return(
        <div>
          <div>
           <Typography variant="h1" gutterBottom component="div" style={{textAlign:'center'}}>
                   Admin Control Panel
          </Typography>
           <Card style={{margin: 'auto', maxWidth: 1000}} elevation={10}>
              <CardBody style={{margin : '-10px'}}> 
                <ButtonBases_Admin/>
              </CardBody>
            </Card>  
          </div>
          <br/>
            <Button style={{display: 'flex', margin: 'auto'}} value="logout" variant="contained" onClick={this.logout}>
                logout
            </Button>
        </div>
     
      );
    }
  


}

export default AdminPage ;