import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios' ;

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlemailclick = async (e) => {

    await axios.post(`http://localhost:8000/user/sendsummary/${props.id}`,{"userID":localStorage.getItem("userID")})
    .then(data => console.log('sent!'));

    handleClose();
    props.state([]);
    
  }

  return (
    <div>
      <IconButton aria-label="cancelflight" onClick={handleClickOpen} id={props.id}>
        <EmailIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"do you want to be mailed a summary of your reservation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            a mail will be sent to you with the details of the reservation
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlemailclick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    




  );
}