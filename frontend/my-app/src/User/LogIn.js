import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import background from "../assets/img/travel.jpg";
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import { ReactComponent as Logo } from './Logo.svg';
import Cookies from 'universal-cookie';


function LogIn(){   //function component declaration

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const cookies = new Cookies();

  const [open , setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit=async (e)=>{//method called when submiting to send a request and clear the fields of the form
   
    e.preventDefault();

    // get user email & password from form here (in sprint 3).
    const email = e.target.email.value;
    const password = e.target.password.value;
    await axios.post('http://localhost:8000/user/login',{'email':email , 'password':password})
                .then((result) => {
                  console.log(result);
                  if(result.data.statusCode == 401){
                    setOpen(true);
                    console.log('ERROR');
                  }else{
                  const userId = result.data.user ;
                  localStorage.setItem('userID',userId);
                  localStorage.setItem('isLoggedIn',true);
                  const timer = setTimeout(() => {
                    console.log("Hello, World!")
                    localStorage.clear();
                  }, 10000);

                  window.location.href='/user'
                  //return () => clearTimeout(timer);
                  }
                                })
  
                .catch(error=>{
                  console.log(error)
                })
               
    }
      return(
        <div>
            <div style={{marginBottom : '0px'}}>
            <Header color='info' style={{position:"static"}} transparent leftLinks={<Link to='/'><div style={{height:'70px',width: '100px' }}>
              <Logo />
             </div></Link>} rightLinks={<HeaderLinks/>} fixed/>
        <div style={{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",height: "600px"}}>
          <div >
          <Typography variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
                   Please enter your credentials
          </Typography>
        <form onSubmit={handleSubmit} id="form" style={{margin:'auto' , width:'20%'}}>
        <TextField 
          required
          key='email'
          id='email'
          label='Email'
          name='email'
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Login failed! Incorrect email or password
          </Alert>
        </Snackbar>
        <div>
        <footer style={{position:"fixed",bottom:0,height: "151px"}}>
        <img src="https://www.pngkey.com/png/full/122-1220928_are-you-a-health-professional-wave-footer-png.png" style={{objectFit:"contain",width:"100%",bottom:0}}/>
        </footer>
        </div>
        </div>
        </div>
        </div>

      );
    }
  

export default LogIn ;
