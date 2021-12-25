import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import axios from 'axios' ;
import { parse } from '@babel/core';

export default function AlertDialogEditRes(props) {
  const [open, setOpen] = React.useState(false);

  const {numOfchildren,numOfadults,numofresseats} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = async (e) => {
    await axios.delete(`http://localhost:8000/user/deleteReservedFlight/${props.reservationId}`).then(
    axios.post(`http://localhost:8000/user/createReservedFlight`,{'reservation':props.reservation})
    .then(data => {
      console.log(data);
      handleClose();
      let rId = data.data.object._id;
      let resNum = data.data.reservationNumber;
      console.log("sending pay");
      axios.post("http://localhost:8000/create-checkout-session",{price:props.reservation.price,reservationNumber:resNum,reservationId:rId})
      .then(data=>{
        console.log("sent pay");
        window.location.href=data.data.url
    }).catch(err=>{console.log("error is");console.log(err);})
    }));

    handleClose();
   // props.state([]);
    
  }

  React.useEffect(()=> {});
  return (
    <div>
         {localStorage.getItem('isLoggedIn') &&<Button  value="Submit" aria-label="delete" variant="contained" onClick={handleClickOpen} 
                disabled={(parseInt(numOfchildren) + parseInt(numOfadults) != parseInt(numofresseats))} endIcon={< EventSeatIcon />} 
                id={props.id}>
            Reserve
        </Button>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Reservation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to confirm this reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteClick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    




  );
}