import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
  


export default function Summary(props){   //function component declaration

    const {fSeats,sSeats,firstId,secondId,handleClick} = props;

    const [firstFlight,set1Flight] = useState({});
    const [secondFlight,set2Flight] = useState({});

    const [finalPrice,setFinalPrice] = useState(null);



    async function fetchData(){
        let result = await axios.get(`http://localhost:8000/getFlight/${firstId}`);
        console.log("result");
        console.log(result);
        set1Flight(result);    
        let secondResult = await axios.get(`http://localhost:8000/getFlight/${secondId}`);
        console.log("secondResult");
        console.log(secondResult);
        set2Flight(secondResult);
        

    }



useEffect(()=>{ fetchData()},[sSeats]);

useEffect(()=>{
    if(firstFlight.data&&secondFlight.data){
    setFinalPrice(firstFlight.data.price * fSeats.length + secondFlight.data.price * sSeats.length);
    (() => handleClick(finalPrice))();
}
},[secondFlight]);

useEffect(() => {(() => handleClick(finalPrice))();},[finalPrice])

      return(
                <div>
                <Card sx={{ maxWidth: 350 , margin: "auto"  }}>
            <CardContent>
                <Typography variant="h5">
                Number of chosen seats : {fSeats.length}
                </Typography>
                <Typography variant="h5">
                Chosen departure seats : {fSeats.map(seat=>'A'+seat + ' ')}
                </Typography>
                <Typography variant="h5">
                Chosen return seats : {sSeats.map(seat=>'B'+seat + ' ')}
                </Typography>
                <Typography variant="h5">
                Total price : {finalPrice + ' LE'}
                </Typography>
            </CardContent>
            </Card>
            </div>
      );
    
}
