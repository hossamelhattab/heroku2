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
  const {oldId,id,setFunc,type,seats} = props;
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
      if(oldId==id)
      setFlight((data.reservedEconomySeats).map((leat,index)=>seats.includes(index+"")?false:leat));
      else
      setFlight(data.reservedEconomySeats)
    }else if(type=="business"){
      if(oldId==id)
      setFlight(data.reservedBusinessSeats.map((leat,index)=>seats.includes(index+"")?false:leat))
      else
      setFlight(data.reservedBusinessSeats)
    }
    console.log("flight")
    console.log(flight);
    console.log("data");
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
            Reserve your departure seats :
          </Typography>
        
        <form onSubmit={handleSubmit} id="form">
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
            {flight.map((seat,index)=>
            <div style={{width:'14%'}}>
                {(seat?
                    <Checkbox
                    id={index.toString()}
                    key={flight.toString()+index.toString()}
                    disabled
                    checked
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 135 } }}
                    />:
                    <Checkbox
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 135 } }}
                    id={index.toString()}
                    key={flight.toString()+index.toString()}
                    color="success"
                    onChange={handleChange}
                    disabled={!(selected.includes(index+''))&&selected.length>=seats.length}
                    />)}
                    </div>
                )
            }   
            </div>
          
          <div style={{width : '10%' , margin : '10px auto'}}>
          <Button value="Submit" type="submit" variant="contained" disabled={selected.length<seats.length} endIcon={<SendIcon />}>
              Submit
          </Button>
          </div>
        </form>
        </div>

      );
    }
  

export default PlaneView ;
