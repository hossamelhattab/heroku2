import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import reactDom from 'react-dom';
import Typography from '@mui/material/Typography';
import background from "../assets/img/wall.jpg";
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './Logo.svg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import HeaderLinks from 'components/Header/HeaderLinks.js';




function Register(){   //function component declaration

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
    

    // get user email & password from form here (in sprint 3).
 const newuser = {
  "firstName" : e.target.firstname.value,
  "lastName" : e.target.lastname.value,
  "passportNumber" : e.target.passport.value,
  "password" : e.target.password.value,
  "email" : e.target.email.value,
  "telephoneNumber" : e.target.telephone.value,
  "countryNumber" : e.target.cc.value,
  "address" : e.target.address.value,


 }
    axios.post('http://localhost:8000/user/register',{'newuser':newuser})
                .then((result) => {
                  console.log("done")
                  if(result.data.statusCode == 401){
                    
                  }else{
                    setOpen(true);
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
          </div>
          <div style={{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",height: "600px"}}>
          <Typography variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
                   Be an adventurer !
          </Typography>
        <form onSubmit={handleSubmit} id="form" style={{margin:'auto' , width:'20%'}}>
          <div style={{display:"inline-block",display: "flex",flexDirection: "column",flexWrap: "wrap",height: "300px",alignContent: "center"}}>
        <TextField 
          required
          key='firstname'
          id='firstname'
          label='First Name'
          name='firstname'
          margin='normal'
          />
           <TextField 
          required
          key='lastname'
          id='lastname'
          label='Last Name'
          name='lastname'
          margin='normal'
          />
           <TextField
          required
          key='passport'
          id='passport'
          label='Passport Number'
          name='passport'
          margin='normal'
          />
        <TextField style={{marginLeft:"10px"}}
          required
          key='email'
          id='email'
          label='Email'
          name='email'
          margin='normal'
          />
          <TextField style={{marginLeft:"10px"}}
          required
          key='password'
          id='password'
          label='Password'
          name='password'
          margin='normal'
          type="password"
          />
          <TextField style={{marginLeft:"10px"}}
          required
          key='address'
          id='address'
          label='Home Address'
          name='address'
          margin='normal'
          />
           <TextField style={{marginLeft:"10px"}}
          required
          key='telephone'
          id='telephone'
          label='Telephone Number'
          name='telephone'
          margin='normal'
          />
          <TextField style={{marginLeft:"10px"}}
          required
          key='cc'
          id='cc'
          label='Country Code'
          name='cc'
          margin='normal'
          />
          </div>
         
          <Button style={{marginLeft:'15px'}} value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Sign Up
          </Button>
        </form>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            Registeration successful
          </Alert>
        </Snackbar>
        <div>
        <footer style={{position:"fixed",bottom:0,height: "151px"}}>
        <img src="https://www.pngkey.com/png/full/122-1220928_are-you-a-health-professional-wave-footer-png.png" style={{objectFit:"contain",width:"100%",bottom:0}}/>
        </footer>
        </div>
        </div>

      );
    }
  

export default Register ;
