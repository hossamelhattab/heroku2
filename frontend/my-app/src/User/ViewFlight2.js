import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Link,useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
  


function ViewFlight(props){   //function component declaration
  const [updated,setUpdated]=useState(false);   //setting states these are like the local storage of a comp with a method to update them 
  //first param is the default value for said variable
  const [flight,setFlight] = useState([]);
  const {cabinclass,numofresseats} = useParams();
  const {id} = props;
  console.log("id:"+props.id)


  //the useEffects aka the listeners who does a update method initially when the component is created
  // and when the prameter which it is listining to is updated
  // the list of dependencies(sensed/listened to) variables are passed as a second paramater to the useEffect
  //in this case its the state variable updated 
  //the update method itself is  an emtpy method body meaning it just rerenders the component whithout doing any computations or fetchs

  useEffect(()=>{
  },[updated])  //<===== this is the dependency list


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

    let depstr = flight["departureTime"]+"";
    let dephour = depstr[0]+""+depstr[1];
    let depsec = depstr[3]+""+depstr[4];
    let arrstr = flight["arrivalTime"]+"";
    let arrhour = arrstr[0]+""+arrstr[1];
    let arrsec = arrstr[3]+""+arrstr[4];
    let dep = new Date(flight["departureDate"]);
    let arr = new Date(flight["arrivalDate"]);
    dep.setHours(dephour);
    arr.setHours(arrhour);
    dep.setMinutes(depsec);
    arr.setMinutes(arrsec);

      return(
        <div>
            <Card sx={{ margin: "auto" }} elevation={6}>
              <div style={{textAlign:'center'}}>
            <CardContent>
              <Typography variant="h3">
                Flight Details
              </Typography>
              <Typography variant="h5">
              Flight number : {flight["flightNumber"]}
              </Typography>
              <Typography variant="h5">
              From : {flight["from"]}
              </Typography>
              <Typography variant="h5">
              To : {flight["to"]}
              </Typography>
              <Typography variant="h5">
              Departure date : {flight["departureDate"]}
              </Typography>
              <Typography variant="h5">
              Departure time : {flight["departureTime"]}
              </Typography>
              <Typography variant="h5">
              Arrival date : {flight["arrivalDate"]}
              </Typography>
              <Typography variant="h5">
              Arrival time : {flight["arrivalTime"]}
              </Typography>
              <Typography variant="h5">
              Trip duration: {(arr-dep)/3600000} hours
              </Typography>
              <Typography variant="h5">
              Baggage allowance : {flight["baggageAllowance"]}
              </Typography>
              <Typography variant="h5">
              Cabin class : {cabinclass}
              </Typography>
              <Typography variant="overline" component="div" color="red">
                you will reserve {numofresseats} seats in {cabinclass} class
              </Typography>
            </CardContent>
            </div>
            <CardActions>
      
            </CardActions>
          </Card>
        </div>
      );
    
    }

export default ViewFlight ;
