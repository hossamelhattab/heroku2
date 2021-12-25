import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import reactDom from 'react-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import background from "../assets/img/travel.jpg";
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './Logo.svg';

function AdminLogIn(){   //function component declaration

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open , setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
   
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    axios.post('http://localhost:8000/admin/login',{'username':username , 'password':password})
                .then((result) => {
                  
                  if(result.data.statusCode == 401){
                    setOpen(true);
                  }else{
                  const adminId = result.data.admin;
                  localStorage.setItem('adminID',adminId);
                  localStorage.setItem('isAdminLoggedIn',true);
                  window.location.href='/admin'
                  }
                                })
  
                .catch(error=>{
                  console.log(error)
                })
               
    }
      return(
        <div>
          <div style={{marginBottom : '0px'}}>
        <div style={{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",height: "600px"}}>
          <div >
          <Typography variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
                   Login to Admin Portal
          </Typography>
        <form onSubmit={handleSubmit} id="form" style={{margin:'auto' , width:'20%'}}>
        <TextField 
          required
          key='username'
          id='username'
          label='Username'
          name='username'
          margin='normal'
          />
          <TextField 
          required
          key='password'
          id='password'
          label='Password'
          name='password'
          margin='normal'
          type="password"
          />
         
          <Button style={{marginLeft:'15px'}} value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Log in
          </Button>
        </form>
        </div>
        <div>
        <footer style={{position:"fixed",bottom:0,height: "151px"}}>
        <img src="https://www.pngkey.com/png/full/122-1220928_are-you-a-health-professional-wave-footer-png.png" style={{objectFit:"contain",width:"100%",bottom:0}}/>
        </footer>
        </div>
        </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Login failed! Incorrect username or password
          </Alert>
        </Snackbar>
        </div>

      );
    }
  

export default AdminLogIn ;
