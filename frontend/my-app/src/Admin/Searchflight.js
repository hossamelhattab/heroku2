import React, {Component} from 'react'
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
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from './AlertDialog';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';

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

class Searchflight extends Component{
  
  constructor(props){
    super(props);
    this.state = {rows:[],state:[]};
  }
  
  submit= async (e) => {
    e.preventDefault();
    const flight = {
      "flightNumber": e.target.fnum.value,
      "departureTime": e.target.deptime.value,
      "arrivalTime": e.target.arrtime.value,
      "departureDate": e.target.depdate.value,
      "arrivalDate": e.target.arrdate.value,
      "from": e.target.fromf.value,
      "to": e.target.to.value,
    }

    await axios.post('http://localhost:8000/searchFlights', flight).then((data) => {
      console.log("search successful!");

      console.log(data.data);
      this.setState({rows:data.data , state : []});

      e.target.fnum.value='';
      e.target.deptime.value='';
      e.target.arrtime.value='';
      e.target.depdate.value='';
      e.target.arrdate.value='';
      e.target.fromf.value='';
      e.target.to.value='';
      

    }).catch(err => console.log(err));


  }  
  render(){
    return(
      <div>

      <Link to="/admin">
            <Button style={{margin:'20px'}} value="home" variant="contained" endIcon={<HomeIcon />}>
                Back to admin portal
            </Button>
      </Link>

          
      <Typography variant="h2" gutterBottom component="div" style={{textAlign: 'center'}}>
         Search for a flight
      </Typography>
        <div className='containerS'>
          <form onSubmit={this.submit} id="form" className='form'>
            <TextField
            id="fnum"
            label="Flight Number"
            name="fnum"
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
            <Button value="Submit" type="submit" variant="contained" style={{marginLeft : '15px'}} endIcon={<SendIcon />}>
                Submit
            </Button>
          </form>
          <TableContainer sx={{ width:'90%' , margin : '0 auto' ,marginLeft:'15px' , marginBottom : '20px' , 
                          borderRadius: '20px'}} component={Paper} elevation={4} className='sched'>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Flight number</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>Arrival Date</StyledTableCell>
                    <StyledTableCell>Arrival Time</StyledTableCell>
                    <StyledTableCell>Departure Date</StyledTableCell>
                    <StyledTableCell>Departure Time</StyledTableCell>
                    <StyledTableCell>Departure</StyledTableCell>
                    <StyledTableCell>Destination</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row.flightNumber}
                      </StyledTableCell>
                      <StyledTableCell>
                        <AlertDialog id={row._id} state={(d) => this.setState(d)}/>
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
      </div>

      );
    }
  


}

export default Searchflight ;