import {useParams,Route,Routes,Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewFlight from './ViewFlight';
import ViewFlight2 from './ViewFlight2';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SearchReturnFlight from './SearchReturnFlight';
import SearchArrFlight from './SearchArrFlight';
import PlaneViewEdit from './PlaneViewEdit';
import PlaneView from './PlaneView';
import PlaneView2 from './PlaneView2';
import AlertDialogConfirmRes from './AlertDialogConfirmRes';
import SimpleAccordion from './SimpleAccordion';
import AlertDialogEditRes from './AlertDialogEditRes';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './Logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';

function EditFlightHandler(){

    let {reservationId} = useParams([]);
    let [firstFlight,setFirstFlight] = useState(null);
    let [OldFirstFlight,setOldFirstFlight] = useState(null);
    let [secondFlight,setSecondFlight] = useState(null);
    let [oldSecondFlight,setOldSecondFlight] = useState(null);
    let [firstSeats,setFirstSeats] = useState(null);
    let [secondSeats,setSecondSeats] = useState(null);
    const [finalPrice,setFinalPrice] = useState(null);
    let [oldPrice,setOldPrice] = useState(0);
    let [cf1,setCf1] = useState(null);
    let [cf2,setCf2] = useState(null);
    let [cs1,setCs1] = useState(null);
    let [cs2,setCs2] = useState(null);
    let [Cabin,setCabin] = useState(null);
    const getPrice = (price) => {setFinalPrice(price)}
    let [numOfadults,setadults] = useState(0);
    let [numOfchildren,setchildren]=useState(0);
    let [numofresseats,setseats]= useState(0);
    useEffect(()=>{
        async function fetchData(){
        let data = await (await axios.get(`http://localhost:8000/user/reservedFlight/${reservationId}`)).data.data
        console.log(data);
        setCabin(data.cabinClass);
        setFirstFlight(data.reservedFlightIDs['0']);
        setOldFirstFlight(data.reservedFlightIDs['0'])
        setSecondFlight(data.reservedFlightIDs['1']);
        setOldSecondFlight(data.reservedFlightIDs['1']);
        setFirstSeats(data.assignedDepartureSeats);
        setSecondSeats(data.assignedReturnSeats);
        setadults(data.numberOfAdults);
        setchildren(data.numberOfChildren);
        setseats(data.numberOfSeats);
        setOldPrice(data.price);
        }
        fetchData();
    },[])

   useEffect(()=>{
 console.log(firstFlight);
   },[firstFlight,secondFlight,firstSeats,secondSeats,cf1,cf2,cs1,cs2])

   useEffect(()=>{
    console.log(finalPrice);
},[finalPrice])


    return(
        <div>
             <Typography variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
                   Update your reservation
            </Typography>
            {!cf1&&firstFlight&&<SearchArrFlight flightId={firstFlight} setFunc={(value)=>{setCf1(true);setFirstFlight(value)}}/>}
            {!cs1&&cf1&&firstSeats&&<PlaneViewEdit oldId={firstFlight} id={firstFlight} type={Cabin} seats={firstSeats} setFunc={(value)=>{setCs1(true);setFirstSeats(value)}} />}
            {!cf2&&cs1&&firstFlight&&<SearchReturnFlight flightId={firstFlight} setFunc={(value)=>{setCf2(true);setSecondFlight(value)}}/>}
            {!cs2&&cf2&&secondSeats&&<PlaneViewEdit oldId={secondFlight} id={secondFlight} type={Cabin} seats={secondSeats} setFunc={(value)=>{setCs2(true);setSecondSeats(value)}} />}
            {cs2&&<div style={{margin: '10px auto' ,width: '100%'}}>
            <div style={{margin:'10px auto' , width: '100%'}}>
            <SimpleAccordion id={firstFlight} secondFlight={secondFlight} 
                            firstSeats={firstSeats} secondSeats={secondSeats} getPrice={getPrice}
                            />
            </div>
            <div style={{margin:'10px auto'}}>
            <AlertDialogEditRes reservationId={reservationId} oldprice={oldPrice} reservation={{reservedUserID:localStorage.getItem('userID'),
                                                reservedFlightIDs:[firstFlight,secondFlight],
                                                numberOfSeats:firstSeats.length,
                                                assignedDepartureSeats:firstSeats,
                                                assignedReturnSeats:secondSeats,
                                                price: finalPrice,
                                                cabinClass: Cabin,
                                                numberOfAdults: numOfadults,
                                                numberOfChildren: numOfchildren,
                                                }}
                                                numOfadults={numOfadults}
                                                numOfchildren={numOfchildren}
                                                numofresseats={numofresseats}
                                                />
            </div>
            </div>}
        </div>
        
    );
}


export default EditFlightHandler;