import {useParams,Route,Routes,Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewFlight from './ViewFlight';
import ViewFlight2 from './ViewFlight2';
import SearchReturnFlight from './SearchReturnFlight';
import PlaneView from './PlaneView';
import PlaneView2 from './PlaneView2';
import AlertDialogConfirmRes from './AlertDialogConfirmRes';
import SimpleAccordion from './SimpleAccordion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import { ReactComponent as Logo } from './Logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function ViewFlightHandler(){

    const {id,cabinclass,numofresseats}=useParams()

    const [secondFlight,setFlight] = useState(null)
    const [firstSeats,setFirst] = useState([])
    const [secondSeats,setSecond] = useState([])
    const [finalPrice,setFinalPrice] = useState(null)
    const [numOfadults,setNumofadults] = useState(0)
    const [numOfchildren,setNumOfchildren] = useState(0)

    const getPrice = (price) => {setFinalPrice(price)}

    useEffect(()=>{
        console.log(secondFlight)
    },[secondFlight])

    useEffect(()=>{
        console.log(firstSeats)
    },[firstSeats])

    useEffect(()=>{
        console.log(secondSeats)
    },[secondSeats])

    useEffect(()=>{
        console.log(finalPrice);
    },[finalPrice])

    useEffect(()=>{
        console.log(numOfadults);
    },[numOfadults])

    useEffect(()=>{
        console.log(numOfchildren);
    },[numOfchildren])

    

    return(
        <div>
          {localStorage.getItem('userID') ? (<div style={{marginBottom : '0px'}}>
            <Header color='info' style={{position:"static"}} transparent leftLinks={<Link to='/user'><div style={{height:'70px',width: '100px' }}>
              <Logo />
             </div></Link>} rightLinks={<HeaderLinksLoggedIn/>} fixed/>
          </div> ) : (
              <div style={{marginBottom : '0px'}}>
              <Header color='info' style={{position:"static"}} transparent leftLinks={<Link to='/'><div style={{height:'70px',width: '100px' }}>
                <Logo />
               </div></Link>} rightLinks={<HeaderLinks/>} fixed/>
            </div>
          )}
            {secondSeats.length!==0?(
            <div>
                <Button style={{margin : '10px'}} startIcon={<ArrowBackIosNewIcon />} variant="outlined" 
                        onClick={()=>{setSecond([])}}>Back</Button>
                <Typography variant="h2" gutterBottom component="div">
                    Summary
                </Typography>
                <div style={{width : '80%' , margin :'auto' , marginTop : '20px' , marginBottom : '20px'}}>
                    <div>
                        <SimpleAccordion id={id} secondFlight={secondFlight} 
                            firstSeats={firstSeats} secondSeats={secondSeats} getPrice={getPrice}
                            />
                    </div>
                </div>
            <div style={{display:'flex' , justifyContent: 'center'}}>
            <div style={{marginRight:'10px'}}>
          <TextField
          required
          id="noofadults"
          label="Number of adults"
          name="noofadults"
          type="number"
          onChange= {(e)=>{
              e.target.value >= 0 ?
            setNumofadults(e.target.value) : setNumofadults(0)
          }}
         pattern='[0-9]*'
          />
          </div>
          <TextField
          required
          id="noofchildren"
          label="Number of children"
          name="noofchildren"
          type="number"
          onChange= {(e)=>{
            e.target.value >= 0 ?
            setNumOfchildren(e.target.value) : setNumOfchildren(0)
          }}
          
          />
            </div>
            <div style={{margin: '10px auto' ,width: '10%'}}>
            <AlertDialogConfirmRes reservation={{reservedUserID:localStorage.getItem('userID'),
                                                reservedFlightIDs:[id,secondFlight],
                                                numberOfSeats:firstSeats.length,
                                                assignedDepartureSeats:firstSeats,
                                                assignedReturnSeats:secondSeats,
                                                price: finalPrice,
                                                cabinClass: cabinclass,
                                                numberOfAdults: numOfadults,
                                                numberOfChildren: numOfchildren,
                                                }}
                                                numOfadults={numOfadults}
                                                numOfchildren={numOfchildren}
                                                numofresseats={numofresseats}
                                                />
            </div>
            </div>
        
        
            ):secondFlight==null?(
            firstSeats.length===0?
            <div>
                <Button style={{margin : '10px'}} startIcon={<ArrowBackIosNewIcon />} variant="outlined" 
                        onClick={()=>{window.location.href='/searchflightuser'}}>Back</Button>
                
            <div style={{display:'flex' , flexDirection : 'row'}}>
                <div style={{width:'50%' , marginLeft: '20px'}}>
                <ViewFlight  id={id}/>
                </div>
                <PlaneView id={id} type={cabinclass} seats={numofresseats} setFunc={(value)=>setFirst(value)} />
            </div>
            </div>:<div>
            {firstSeats.length!==0&&(
            <div>
                 <Button style={{margin : '10px'}} startIcon={<ArrowBackIosNewIcon />} variant="outlined" 
                        onClick={()=>{setFirst([])}}>Back</Button>
                 <Typography variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
                    Please choose one of the following return flights
                </Typography>
            <SearchReturnFlight flightId={id} setFunc={(value)=>setFlight(value)}/>
            </div>
            )}
          </div>
            ):
            <div>
                 <Button style={{margin : '10px'}} startIcon={<ArrowBackIosNewIcon />} variant="outlined" 
                        onClick={()=>{setFlight(null)}}>Back</Button>
                <div style={{display:'flex' , flexDirection : 'row'}}>
                <div style={{width:'50%' , marginLeft: '20px'}}>
                <ViewFlight2 id={secondFlight}/>
                </div>
                <PlaneView2 id={secondFlight} type={cabinclass} seats={numofresseats} setFunc={(value)=>setSecond(value)}/>
                
            </div>
            
            </div>
            
            }
                <div>
        <footer style={{bottom:0,height: "151px"}}>
        <img src="https://www.pngkey.com/png/full/122-1220928_are-you-a-health-professional-wave-footer-png.png" style={{objectFit:"contain",width:"100%",bottom:0}}/>
        </footer>
        </div>
        
        </div>
        
    );
}


export default ViewFlightHandler ;