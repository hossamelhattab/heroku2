import * as React from 'react';
import {Link,useParams} from 'react-router-dom';
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
import AlertDialogReservation from './AlertDialogReservation';
import AlertDialogmail from './AlertDialogmail';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './Logo.svg';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

function Reservedflights() {

  const [rows, setRows] = useState([]); //declare state param named rows for data of sched and its update method setRows
  const [state,setState] = useState([]);
  const {id} =  useParams();

  const getAllresFlights =async () => {
        console.log(id);
        let flights = [];
        await axios.get(`http://localhost:8000/user/getAllReservedFlights/${id}`)                   
        .then(result => {

          result.data.reservation.forEach(flight => {

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
    
    const interval = setInterval(() => {getAllresFlights()},10000);
    return () => clearInterval(interval); // equal to componentDidUnmount(clearInterval(interval);)
    
  },[]);

  useEffect(() => {
    getAllresFlights();
  },[state]);


      //Link to direct back to home
      return (
        <div >
          <div style={{marginBottom : '0px'}}>
                <Header color='info' style={{position:"static"}} transparent leftLinks={<Link to='/user'><div style={{height:'70px',width: '100px' }}>
                  <Logo />
                 </div></Link>} rightLinks={<HeaderLinksLoggedIn/>} fixed/>
              </div>
          <div style={{margin : 'auto' , textAlign : 'center'}}>
            <Typography  variant="h3" gutterBottom component="div">
              Reserved Flights
            </Typography>
          </div>
          <div style={{height:"400px"}}>
        <TableContainer sx={{ width:'90%' , margin : 'auto' , marginBottom : '20px' , 
                              borderRadius: '20px'}}  component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Reservation number</StyledTableCell>
                <StyledTableCell>Flight ID</StyledTableCell>
                <StyledTableCell>Number of seats</StyledTableCell>
                <StyledTableCell>Assigned departure seats</StyledTableCell>
                <StyledTableCell>Assigned return seats</StyledTableCell>
                <StyledTableCell>Total price</StyledTableCell>
                <StyledTableCell>Number of adults</StyledTableCell>
                <StyledTableCell>Number of children</StyledTableCell>
                <StyledTableCell>Options</StyledTableCell>
                <StyledTableCell>Mail me</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.reservationNumber}
                  </StyledTableCell>
                  <StyledTableCell>{row.reservedFlightIDs}</StyledTableCell>
                  <StyledTableCell>{row.numberOfSeats}</StyledTableCell>
                  <StyledTableCell>{row.assignedDepartureSeats.map(seat=>'A'+seat + ' ') + ' '}</StyledTableCell>
                  <StyledTableCell>{row.assignedReturnSeats.map(seat=>'B'+seat + ' ') + ' '}</StyledTableCell>
                  <StyledTableCell>{row.price * row.numberOfSeats}</StyledTableCell>
                  <StyledTableCell>{row.numberOfAdults}</StyledTableCell>
                  <StyledTableCell>{row.numberOfChildren}</StyledTableCell>
                  <StyledTableCell>
                    <AlertDialogReservation id={row._id} state={(d) => setState(d)}/>
                  </StyledTableCell>
                  <StyledTableCell>
                    <AlertDialogmail id={row._id} state={(d) => setState(d)}/>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to={"/editReservation/" + row._id}>
                      <IconButton color="primary" aria-label="upload picture" component="span" id={row._id}>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
            <footer >
            <img src="https://www.pngkey.com/png/full/122-1220928_are-you-a-health-professional-wave-footer-png.png" style={{objectFit:"contain",width:"100%",bottom:0}}/>
            </footer>
            </div>
        </div>
    
        </div>
      );
}





export default Reservedflights;