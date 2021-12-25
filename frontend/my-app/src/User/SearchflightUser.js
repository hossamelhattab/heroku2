import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HomeIcon from '@mui/icons-material/Home';
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ButtonBasesLoggedIn from './ButtonBasesLoggedIn';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './Logo.svg';



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

export default function SearchflightUser() {


  const [cabinclass, setCabinclass] = React.useState('Economy');
  const [numofresseats, setNumofresseats] = React.useState(0);

  const handleChange = (e) => {
    setCabinclass(e.target.value);
  };

  const [state,setState] = React.useState([]);
  const [rows,setRows] = React.useState([]);
  
  const submit= async (e) => {
    e.preventDefault();
    const flight = {
      "departureTime": e.target.deptime.value,
      "arrivalTime": e.target.arrtime.value,
      "departureDate": e.target.depdate.value,
      "arrivalDate": e.target.arrdate.value,
      "from": e.target.fromf.value,
      "to": e.target.to.value
    }
    const selected = {
      "select" : cabinclass,
      "numofseats" : e.target.numofseats.value
    }
    setNumofresseats(e.target.numofseats.value);
    await axios.post('http://localhost:8000/searchFlightsuser', {"flight" : flight , "selected":selected}).then((data) => {
      console.log("search successful!");


      console.log(data.data);
      setState([]);
      setRows(data.data);

      e.target.deptime.value='';
      e.target.arrtime.value='';
      e.target.depdate.value='';
      e.target.arrdate.value='';
      e.target.fromf.value='';
      e.target.to.value='';
      e.target.fromf.value='';
      
    }).catch(err => console.log(err));


  }  
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
        <div style={{margin : 'auto' , textAlign : 'center'}}>
          <Typography  variant="h3" gutterBottom component="div">
            Search and Reserve your flights seats
          </Typography>
        </div>
        <div className='containerS'>
          <form onSubmit={submit} id="form" className='form'>
          <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="cabinclasslabel">Cabin Class</InputLabel>
        <Select
          labelId="cabinclasslabel"
          id="cabinclass"
          value = {cabinclass}
          onChange = {handleChange}
          label="cabinclass"
        >
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value = "economy">Economy</MenuItem>
        </Select>
      </FormControl>
            <TextField
            required
            id="numofseats"
            label="Number of seats"
            name="numofseats"
            type="number"
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
            id="deptime"
            label="Departure Time"
            name="deptime"
            type="time"
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
            id="arrtime"
            label="Arrival Time"
            name="arrtime"
            type="time"
            InputLabelProps={{ shrink: true }}
            />
            <TextField
            id="fromf"
            label="From Terminal"
            name="fromf"
            InputLabelProps={{ shrink: true }}
            />
            <TextField
            id="to"
            label="To Terminal"
            name="to"
            InputLabelProps={{ shrink: true }}
            />
            <Button value="Submit" type="submit" style={{marginLeft : '15px'}} variant="contained" endIcon={<SendIcon />}>
                Submit
            </Button>
          </form>
          <TableContainer sx={{ width:'70%' , margin : '0 auto' , marginBottom : '20px' , 
                          borderRadius: '20px'}} elevation={4} component={Paper} className='sched'>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Arrival Date</StyledTableCell>
                    <StyledTableCell>Arrival Time</StyledTableCell>
                    <StyledTableCell>Departure Date</StyledTableCell>
                    <StyledTableCell>Departure Time</StyledTableCell>
                    <StyledTableCell>Departure</StyledTableCell>
                    <StyledTableCell>Destination</StyledTableCell>
                    <StyledTableCell>View</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
                    <StyledTableRow key={row._id}>
                      <StyledTableCell>{row.arrivalDate}</StyledTableCell>
                      <StyledTableCell>{row.arrivalTime}</StyledTableCell>
                      <StyledTableCell>{row.departureDate}</StyledTableCell>
                      <StyledTableCell>{row.departureTime}</StyledTableCell>
                      <StyledTableCell>{row.from}</StyledTableCell>
                      <StyledTableCell>{row.to}</StyledTableCell>
                      <StyledTableCell>
                        {/* <IconButton aria-label="delete" onClick={handleDeleteClick} id={row._id}>
                          <DeleteIcon />
                        </IconButton> */}
                        <Link to={"/viewflight/" + row._id + "/" + cabinclass+"/"+numofresseats}>
                          <IconButton color="primary" aria-label="upload picture" component="span" id={row._id}>
                            <PreviewIcon />
                          </IconButton>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
        <div>
        <footer style={{bottom:0,height: "151px"}}>
        <img src="https://www.pngkey.com/png/full/122-1220928_are-you-a-health-professional-wave-footer-png.png" style={{objectFit:"contain",width:"100%",bottom:0}}/>
        </footer>
        </div>
      </div>
      );
    
}
