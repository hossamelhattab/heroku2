import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import reactDom from 'react-dom';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



function ViewProfile(){   //function component declaration

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [updated,setUpdated]=useState(false);   //setting states these are like the local storage of a comp with a method to update them 
  //first param is the default value for said variable
  const [userState,setuserState] = useState([]);
  const {id} = useParams();
  const [authpass,setAuthpass] = useState("");
  const [open , setOpen] = useState(false);
  const [openError , setOpenError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenError(false);
  };

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
    e.preventDefault();//prevent refresh
    const update = {
      "firstName":e.target.firstName.value,
      "lastName":e.target.lastName.value,
      "passportNumber":e.target.passportNumber.value,
      "password":e.target.npassword.value,
      "email":e.target.email.value,
    }
    const opassword = e.target.password.value
    console.log("opp" , opassword)
    console.log("opp" ,authpass)
    if( opassword === authpass){
    console.log(update);
    axios.put(`http://localhost:8000/user/update/${id}`,{user:update})  //the update request
    .then(data=>{
      console.log(data.data);
      console.log("updated successfully")
        //in the then part meaning if the request is successful clear the feilds and set a flag "updated" to true 
        //its part of the state of the component so if you have a listener for it (the useEffect) it will sense that the flag is updated
        //therefore reupdating the component 
        e.target.firstName.value='';
        e.target.lastName.value='';
        e.target.passportNumber.value='';
        e.target.password.value='';
        e.target.email.value='';

      setUpdated(true);
      setOpen(true);

    }).catch(error=>{
      console.log(error)
    })
  }else{
    setOpenError(true);
  }}
  //the useEffects aka the listeners who does a update method initially when the component is created
  // and when the prameter which it is listining to is updated
  // the list of dependencies(sensed/listened to) variables are passed as a second paramater to the useEffect
  //in this case its the state variable updated 
  //the update method itself is  an emtpy method body meaning it just rerenders the component whithout doing any computations or fetchs

  useEffect(()=>{
  },[updated])  //<===== this is the dependency list


  //in this one the dependency list is empty it runs only on creation 
  //so basically it does fetch the userState once by the id sets another variable to the result of the request
  //notice that we have another listener for the userState variable meaning that when the data arrives it does sth which is basically a rerender
   useEffect(()=>{
    async function fetchData(){
    let data = (await axios.get(`http://localhost:8000/user/getInfo/${id}`)).data
    setuserState(data.data);
    setAuthpass(data.data.password) 
    console.log("right" ,authpass)
    }


    fetchData();
  },[id]) //<==== empty dependency list meaning it only runs (initially) on creation of the component only 
  

  //when the userState data arrives or when the userState variable is updated just rerender the component and populate the fields
  //with the userState data captured from the request
  useEffect(()=>{
  },[userState])

      return(
        <div>

          <Link to="/user">
            <Button style={{margin:'20px'}} value="home" variant="contained" endIcon={<HomeIcon />}>
                Home
            </Button>
          </Link>
          <Typography variant="h2" gutterBottom component="div" style={{textAlign: 'center'}}>
                    Update Profile
                </Typography>
        <form onSubmit={handleSubmit} id="form" style={{margin:'auto' , width:'20%',marginLeft:'400px'}}>
          <div style={{display:'flex', flexDirection:'column' , flexWrap:'wrap',height:"400px"}}>
          {(Object.keys(userState).slice(1,6)).map((f)=>(//loop over the userState info and map them to fields with their default value
         <React.Fragment>
         {f=="password" ?(
           <React.Fragment>

         </React.Fragment>):(
         <TextField 
          required
          key={f}
          id={f}
          label={f}
          name={f}
          defaultValue={(f=="password") ? "" : userState[f]}
          margin='normal'
          />)}
          </React.Fragment>
          ))}

                       <div style={{marginLeft:"60px",border:"solid #1976d2 3px",padding:"20px",borderRadius:"10px"}}>
                <Typography variant="caption" style={{fontSize:'16px'}} color = "#1976d2"  gutterBottom component="div">
                    Update password
                </Typography>
                  <TextField sx={{marginRight:"20px"}}
                  required
                  key="password"
                  id="password"
                  label="old password"
                  name="password"
                  defaultValue=""
                  margin='normal'
                  />
         <TextField sx={{marginRight:"10px"}}
         required
         id="npassword"
         label="new password"
         name="npassword"
         margin='normal'
         />
         </div>
         
          </div>
          <div style={{margin:"auto" , marginLeft:'275px'}}>
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Update Profile
          </Button>
          </div>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            Updated info successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Wrong Password! Please try again
          </Alert>
        </Snackbar>
        </div>

      );
    }
  

export default ViewProfile ;
