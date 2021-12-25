import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';




function PlaneView(props){   //function component declaration
  const [selected,setSelected] = useState([]);
  const [flight,setFlight] = useState([]);
  const {id,setFunc,type,seats} = props;
  let i =0;

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
    e.preventDefault();//prevent refresh
    //replace with a method that sets parent state(seats of flight)
    setFunc(selected);

    console.log(selected);
  }
//checkbtn
  const handleChange=(e)=>{

    let thisseat=e.target.id;
    let selectedSeats = selected
    if(e.target.checked){
        if(!(selectedSeats.includes(thisseat))){
          selectedSeats= selectedSeats.concat([thisseat])
        }
    }
    else{
      selectedSeats = selectedSeats.filter(seat=>(seat!=thisseat))
    }
    setSelected(selectedSeats)
  }

  useEffect(()=>{
    console.log(selected)
  },[selected])
  
  useEffect(()=>{
    async function fetchData(){
    let data = (await axios.get(`http://localhost:8000/getFlight/${id}`)).data
    if(type=="economy"){
      setFlight(data.reservedEconomySeats);
    }else if(type=="business"){
      setFlight(data.reservedBusinessSeats)
    }
    console.log(flight);
    console.log(data);
    }


    fetchData();
  },[id]) //<==== empty dependency list meaning it only runs (initially) on creation of the component only 
  

  //when the flight data arrives or when the flight variable is updated just rerender the component and populate the fields
  //with the flight data captured from the request
  useEffect(()=>{
      console.log('flight loaded successfully')
  },[flight])

      return(
        <div>

          <Typography  variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
            Reserve your return seats :
          </Typography>
        
        <form onSubmit={handleSubmit} id="form">
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
            {flight.map((seat,index)=>
            <div style={{width:'14%'}}>
                {(seat?
                    <Checkbox
                    id={index.toString()}
                    key={index.toString()}
                    disabled
                    checked
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 135 } }}
                    />:
                    <Checkbox
                    id={index.toString()}
                    key={index.toString()}
                    color="success"
                    onChange={handleChange}
                    disabled={!(selected.includes(index+''))&&selected.length>=seats}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 135 } }}
                    />)}
                    </div>
                )
            }   
            </div>
         
          <Button value="Submit" type="submit" variant="contained" disabled={selected.length<seats} endIcon={<SendIcon />}>
              Submit
          </Button>
        </form>
        </div>

      );
    }
  

export default PlaneView ;
