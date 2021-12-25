import React, {Component, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



export default function Addflights(){
  
  const [inserted , setInserted] = useState(false);
  const [open , setOpen] = useState(false);
   

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const submit= (e) => {

    e.preventDefault();

    const flight = {
      "flightNumber": e.target.fnum.value,
      "departureTime": e.target.deptime.value,
      "arrivalTime": e.target.arrtime.value,
      "departureDate": e.target.depdate.value,
      "arrivalDate": e.target.arrdate.value,
      "economySeats": e.target.ecseats.value,
      "businessSeats": e.target.busseats.value,
      "totalSeats":parseInt(e.target.ecseats.value)+ parseInt(e.target.busseats.value),
      "from": e.target.fromf.value,
      "to": e.target.to.value,
      "price":e.target.price.value,
      "baggageAllowance":e.target.baggageAllowance.value,
      "availableeconomySeats" : e.target.ecseats.value,
      "availableBusinessSeats" : e.target.busseats.value,
      //"reservedBusinessSeats" : [],
      //"reservedEconomySeats" : []
    }
     
    
    axios.post('http://localhost:8000/createFlight',{"flight" : flight}).then((data) => {
      console.log("success");
      console.log(data)

      e.target.fnum.value='';
      e.target.deptime.value='';
      e.target.arrtime.value='';
      e.target.depdate.value='';
      e.target.arrdate.value='';
      e.target.ecseats.value='';
      e.target.busseats.value='';
      e.target.fromf.value='';
      e.target.to.value='';
      e.target.price.value='';
      e.target.baggageAllowance.value='';

      setInserted(true);
      setOpen(true);
      //this.setState({notValidObjString:""});

    })//.catch((err, data) => console.log(err.message));
      .catch(error=>{
        let temp = "";
        console.log("error response");
        const errors = error.response.data.errors
        let keyss = Object.keys(errors);
        let valuess = Object.values(errors);
        for(let i in keyss){
          temp += keyss[i] + ": " + valuess[i] + ", "
        }
        //this.setState({notValidObjString:temp.substring(0, temp.length-2)});
        console.log("error string");
        console.log(temp.substring(0, temp.length-2));
        setInserted(false);
        //console.log(Object.keys(error.response.data.errors).map());
        })

  }  
  
      return(
        <div>

          <Link to="/admin">
            <Button style={{margin: '20px'}} value="home" variant="contained" endIcon={<HomeIcon />}>
                Back to admin portal
            </Button>
          </Link>
          <Typography variant="h2" gutterBottom component="div" style={{textAlign: 'center'}}>
         Create a new flight
      </Typography>
       <form onSubmit={submit} id="form" style={{margin:'auto',width:'20%',}} >
          <div style={{margin:'auto' ,display: "flex",flexDirection: "column",flexWrap: "wrap",height: "500px",alignContent: "center"}}>
          <TextField
          required
          id="fnum"
          label="Flight Number"
          name="fnum"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          required
          id="deptime"
          label="Departure Time"
          name="deptime"
          type="time"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          required
          id="arrtime"
          label="Arrival Time"
          name="arrtime"
          type="time"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          id="depdate"
          label="Departure Date"
          name="depdate"
          type="date"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          id="arrdate"
          label="Arrival Date"
          name="arrdate"
          type="date"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          required
          id="ecseats"
          label="Number of Economy Seats"
          name="ecseats"
          type="number"
          InputLabelProps={{ shrink: true }}
          />
          <div style={{marginLeft:"20px"}}>
          <TextField
          required
          id="busseats"
          label="Number of Business Seats"
          name="busseats"
          type="number"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          required
          id="fromf"
          label="From Terminal"
          name="fromf"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          required
          id="to"
          label="To Terminal"
          name="to"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          required
          id="price"
          label="price"
          name="price"
          type="number"
          InputLabelProps={{ shrink: true }}
          />
          <TextField
          required
          id="baggageAllowance"
          label="baggage Allowance"
          name="baggageAllowance"
          InputLabelProps={{ shrink: true }}
          />
          </div>
          </div>
          <Button style={{marginLeft : '15px'}} value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            Created flight sucessfully
          </Alert>
        </Snackbar>
        </div>

      );
    
  


}
