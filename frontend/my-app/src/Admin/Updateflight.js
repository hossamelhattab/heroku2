import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




function Updateflight(){   //function component declaration

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [updated,setUpdated]=useState(false);   //setting states these are like the local storage of a comp with a method to update them 
  //first param is the default value for said variable
  const [flight,setFlight] = useState([]);
  const {id} = useParams();
  const [notValid,setNotValid]=useState(false);
  const [notValidObj,setNotValidObj]=useState([]);
  const [notValidObjString,setNotValidObjString]=useState("");
  const [open , setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
    e.preventDefault();//prevent refresh
    let newReservedBusinessSeats = flight.reservedBusinessSeats.slice(0, parseInt(e.target.businessSeats.value));
    let newReservedEconomySeats = flight.reservedEconomySeats.slice(0, parseInt(e.target.economySeats.value));
    let newAvailableBusinessSeats = parseInt(e.target.businessSeats.value) - newReservedBusinessSeats.filter(x => x).length;
    let newAvailableeconomySeats = parseInt(e.target.economySeats.value) - newReservedEconomySeats.filter(x => x).length;
    const update = {
      "flightNumber":flight.flightNumber,
      "departureTime":e.target.departureTime.value,
      "arrivalTime":e.target.arrivalTime.value,
      "departureDate":e.target.departureDate.value,
      "arrivalDate":e.target.arrivalDate.value,
      "economySeats":e.target.economySeats.value,
      "businessSeats":e.target.businessSeats.value,
      "totalSeats": parseInt(e.target.economySeats.value)+ parseInt(e.target.businessSeats.value),
      "from":e.target.from.value,
      "to":e.target.to.value,
      "price":parseInt(e.target.price.value),
      "baggageAllowance":parseInt(e.target.baggageAllowance.value),
      "reservedBusinessSeats":newReservedBusinessSeats,
      "reservedEconomySeats":newReservedEconomySeats,
      "availableBusinessSeats":newAvailableBusinessSeats,
      "availableeconomySeats":newAvailableeconomySeats,
      //"returnDate":e.target.returnDate.value
    }
    console.log(update);
    axios.put(`http://localhost:8000/updateFlight/${id}`,{"flight" : update})  //the update request
    .then(data=>{
      console.log(data);
      console.log("updated successfully")
        //in the then part meaning if the request is successful clear the feilds and set a flag "updated" to true 
        //its part of the state of the component so if you have a listener for it (the useEffect) it will sense that the flag is updated
        //therefore reupdating the component 
      //e.target.flightNumber.value='';
      e.target.departureTime.value='';
      e.target.arrivalTime.value='';
      e.target.departureDate.value='';
      e.target.arrivalDate.value='';
      e.target.economySeats.value='';
      e.target.businessSeats.value='';
      e.target.from.value='';
      e.target.to.value='';
      e.target.price.value='';
      e.target.baggageAllowance.value='';

      setUpdated(true);
      setNotValidObjString("");
      setOpen(true);

    }).catch(error=>{
      let temp = "";
      console.log("error response");
      const errors = error.response.data.errors
      let keyss = Object.keys(errors);
      let valuess = Object.values(errors);
      for(let i in keyss){
        temp += keyss[i] + ": " + valuess[i] + ", "
      }
      setNotValidObjString(temp.substring(0, temp.length-2));
      console.log("error string");
      console.log(temp.substring(0, temp.length-2));
      setUpdated(false);
      //console.log(Object.keys(error.response.data.errors).map());
    })
  }
  //the useEffects aka the listeners who does a update method initially when the component is created
  // and when the prameter which it is listining to is updated
  // the list of dependencies(sensed/listened to) variables are passed as a second paramater to the useEffect
  //in this case its the state variable updated 
  //the update method itself is  an emtpy method body meaning it just rerenders the component whithout doing any computations or fetchs

  useEffect(()=>{
  },[updated,notValidObj])  //<===== this is the dependency list


  //in this one the dependency list is empty it runs only on creation 
  //so basically it does fetch the flight once by the id sets another variable to the result of the request
  //notice that we have another listener for the flight variable meaning that when the data arrives it does sth which is basically a rerender
   useEffect(()=>{
    async function fetchData(){
    let data = (await axios.get(`http://localhost:8000/getFlight/${id}`)).data
    setFlight(data);
    console.log(data);
    }


    fetchData();
  },[id]) //<==== empty dependency list meaning it only runs (initially) on creation of the component only 
  

  //when the flight data arrives or when the flight variable is updated just rerender the component and populate the fields
  //with the flight data captured from the request
  useEffect(()=>{
  },[flight])
  
  /*useEffect(()=>{
  },[notValid])

  useEffect(()=>{
  },[notValidObj])*/

  useEffect(()=>{
  },[notValidObjString])

      return(
        <div>

          <Link to="/admin">
            <Button style={{margin:'20px'}} value="home" variant="contained" endIcon={<HomeIcon />}>
                Back to admin portal
            </Button>
          </Link>

          
          <Typography variant="h2" gutterBottom component="div" style={{textAlign: 'center'}}>
              Update flight number {flight.flightNumber}
          </Typography>
        <form onSubmit={handleSubmit} id="form" style={{margin:'auto' , width:'20%'}}>
        <div style={{margin:'auto' ,display: "flex",flexDirection: "column",flexWrap: "wrap",height: "400px",alignContent: "center"}}>
          {(Object.keys(flight).slice(2,13)).map((f)=>(//loop over the flight info and map them to fields with their default value
          (f!='totalSeats')&&(<TextField
          required
          key={f}
          type={(f.includes('Time') ? 'time' : 
                (f.includes('Date') ? 'date' : 
                (f.includes('Seats') ? 'number' : 'string')))}
          helperText={(f.includes('Time') ? 'Please use HH:MM' : 
                      (f.includes('Date') ? 'Please use YYYY-MM-DD' : ''))}
          id={f}
          label={f}
          name={f}
          defaultValue={flight[f]}
          margin='normal'
          />)
          ))}
         </div>
         <div>
          <Button style={{marginLeft: '15px'}} value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Update
          </Button>
          </div>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            Updated flight successfully
          </Alert>
        </Snackbar>
        </div>

      );
    }
  

export default Updateflight ;
