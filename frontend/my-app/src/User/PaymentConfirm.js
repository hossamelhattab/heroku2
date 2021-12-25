import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';


function PaymentConfirmation(){   //function component declaration
  const {id} = useParams();
  const [confirmed,setConfirmed] = useState(false);

   useEffect(()=>{
    async function fetchData(){
    await axios.post(`http://localhost:8000/confirm-payment/${id}`)
    .then((data)=>{setConfirmed(true)})
    await axios.post(`http://localhost:8000/user/sendsummary/${id}`,{"userID":localStorage.getItem("userID")})
    .then(data => console.log('sent!'));
    setTimeout(()=>{window.location.href = "/user";},5000);
    
    }


    fetchData();
  },[id]) 
  

  useEffect(()=>{},[confirmed])


      return(
        <div>
          <Link to="/user">
            <Button style={{margin: '20px'}} value="home" variant="contained" endIcon={<HomeIcon />}>
                Home
            </Button>
          </Link>
    <Card sx={{ maxWidth: 800 , margin: "auto"  }}>
      <CardContent>
        <Typography variant="h4">
        {confirmed?`Payment confirmed!  Thank you for using AirlineZ  
                    We hope you have a great flight!`:"pending...."}
        </Typography>
        <Typography variant="h6">
        {confirmed?"An email has been sent to you. You will now be redirected to the home page":"pending...."}
        </Typography> 
      </CardContent>
      
    </Card>
    </div>
      );
    
    }

export default PaymentConfirmation ;
