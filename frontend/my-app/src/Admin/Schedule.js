import * as React from 'react';
import {Link} from 'react-router-dom';
import { useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios' ;
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from './AlertDialog';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
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



function Schedule() {

  const [rows, setRows] = useState([]); //declare state param named rows for data of sched and its update method setRows
  const [state,setState] = useState([]);

  const getAllFlights =async () => {

        let flights = [];
        await axios.get('http://localhost:8000/allFlights')                   
        .then(result => {

          result.data.forEach(flight => {

            flights.push(flight);
          });

        }).catch(err => {
                console.log(err);
                });
        setRows(flights);
        console.log(flights);    
  }    
  

  useEffect(() => {  //use useEffect as a method that runs when the component is created
     // by default useEffect runs both on creation and update we do change the state when we update row causing an infinite loop 
     // therefore add this second param [] to useEffect after the method to make it run on creation only
     // equivelent to componentDidMount and componentDidUpdate
    
    const interval = setInterval(() => {getAllFlights()},10000);
    return () => clearInterval(interval); // equal to componentDidUnmount(clearInterval(interval);)
    
  },[]);

  useEffect(() => {
    getAllFlights();
  },[state]);

  const handleDeleteClick = async (e) => {

    await axios.delete(`http://localhost:8000/deleteFlight/${e.currentTarget.id}`)
    .then(data => console.log('DELETED!'));

    setState();
    
  }




      //Link to direct back to home
  return (
    <div >
     <Link to="/admin">
            <Button style={{margin: '20px'}} value="home" variant="contained" endIcon={<HomeIcon />}>
                Back to admin portal
            </Button>
      </Link>

          
      <Typography variant="h2" gutterBottom component="div" style={{textAlign: 'center'}}>
         Schedule
      </Typography>
    <TableContainer sx={{ width:'90%' , margin : '0 auto' , marginBottom : '20px' , 
                          borderRadius: '20px'}} component={Paper} elevation={4}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Flight number</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Arrival Date</StyledTableCell>
            <StyledTableCell>Arrival Time</StyledTableCell>
            <StyledTableCell>Departure Date</StyledTableCell>
            <StyledTableCell>Departure Time</StyledTableCell>
            <StyledTableCell>Departure</StyledTableCell>
            <StyledTableCell>Destination</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.flightNumber}
              </StyledTableCell>
              <StyledTableCell>
                <AlertDialog id={row._id} state={(d) => setState(d)}/>
              </StyledTableCell>  
              <StyledTableCell>
                {/* <IconButton aria-label="delete" onClick={handleDeleteClick} id={row._id}>
                  <DeleteIcon />
                </IconButton> */}
                <Link to={"/updateflight/" + row._id}>
                  <IconButton color="primary" aria-label="upload picture" component="span" id={row._id}>
                    <EditIcon />
                  </IconButton>
                </Link>
              </StyledTableCell>
              <StyledTableCell>{row.arrivalDate}</StyledTableCell>
              <StyledTableCell>{row.arrivalTime}</StyledTableCell>
              <StyledTableCell>{row.departureDate}</StyledTableCell>
              <StyledTableCell>{row.departureTime}</StyledTableCell>
              <StyledTableCell>{row.from}</StyledTableCell>
              <StyledTableCell>{row.to}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}





export default Schedule;