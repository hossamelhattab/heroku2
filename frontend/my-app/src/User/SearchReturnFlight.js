import React, {Component} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import PreviewIcon from '@mui/icons-material/Preview';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function SearchReturnFlight(props) {

  const [rows, setRows] = useState([]); //declare state param named rows for data of sched and its update method setRows
  const [state,setState] = useState(null);
  const {flightId,setFunc} = props;
  let from,to, arrive;


  // const {from, to} = props;
  useEffect(async() => {  

    await axios.get(`http://localhost:8000/getFlight/${flightId}`).then((flight)=>{
    console.log(flight);
    to = flight.data.from;
    from = flight.data.to;
    arrive = flight.data.arrivalDate;
    getAllFlights();
  })
  },[flightId]);



  const getAllFlights =async () => {

        let flights = [];
        await axios.get('http://localhost:8000/allFlights')                   
        .then(result => {

          result.data.forEach(flight => {
            if(flight.from == from && flight.to == to && Date.parse(flight.departureDate) > Date.parse(arrive))
              flights.push(flight);
          });

        }).catch(err => {
                console.log(err);
                });
        setRows(flights);
 
  }    

 

      //Link to direct back to home
  return (
    <div style={{height:"300px"}} >
    <TableContainer sx={{ width:'90%' , margin : '0 auto' , marginBottom : '20px' , 
                          borderRadius: '20px'}} component={Paper} elevation={4}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Flight number</StyledTableCell>
            <StyledTableCell>Arrival Date</StyledTableCell>
            <StyledTableCell>Arrival Time</StyledTableCell>
            <StyledTableCell>Departure Date</StyledTableCell>
            <StyledTableCell>Departure Time</StyledTableCell>
            <StyledTableCell>Departure</StyledTableCell>
            <StyledTableCell>Destination</StyledTableCell>
            <StyledTableCell>Duration</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>view a flight</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {  //loop on rows and map to the template TableRows and Columns 
                let depstr = row.departureTime+"";
                let dephour = depstr[0]+""+depstr[1];
                let depsec = depstr[3]+""+depstr[4];
                let arrstr = row.arrivalTime+"";
                let arrhour = arrstr[0]+""+arrstr[1];
                let arrsec = arrstr[3]+""+arrstr[4];
                let dep = new Date(row.departureDate);
                let arr = new Date(row.arrivalDate);
                dep.setHours(dephour);
                arr.setHours(arrhour);
                dep.setMinutes(depsec);
                arr.setMinutes(arrsec);
                return(  
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.flightNumber}
              </StyledTableCell>
              <StyledTableCell>{row.arrivalDate}</StyledTableCell>
              <StyledTableCell>{row.arrivalTime}</StyledTableCell>
              <StyledTableCell>{row.departureDate}</StyledTableCell>
              <StyledTableCell>{row.departureTime}</StyledTableCell>
              <StyledTableCell>{row.from}</StyledTableCell>
              <StyledTableCell>{row.to}</StyledTableCell>
              <StyledTableCell>{(arr-dep)/3600000 + " hours"}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>
                        {/* <IconButton aria-label="delete" onClick={handleDeleteClick} id={row._id}>
                          <DeleteIcon />
                        </IconButton> */}
                        <Button onClick={()=>{setFunc(row._id)}}>
                        {/* <Link to={"/viewreturnflight/" + row._id}> */}
                          <IconButton color="primary" aria-label="upload picture" component="span" id={row._id}>
                            <PreviewIcon />
                          </IconButton>
                        {/* </Link> */}
                        </Button>
                      </StyledTableCell>
            </StyledTableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}


export default SearchReturnFlight ;