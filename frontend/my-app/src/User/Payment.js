import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';


class Payment extends Component{
  state={
    inserted:false
  }
  
  submit= (e) => {
    e.preventDefault();

  }  
  render(){
      return(
        <div>

        <Link to="/admin">
          <Button value="home" variant="contained" endIcon={<HomeIcon />}>
            Home
          </Button>
        </Link> 
          <br/>
        <h1>Payment Information</h1>  
       {/* {this.state.inserted && <h2 className="feedback-header"> Inserted flight successfully</h2>} */}
        <form onSubmit={this.submit} id="form">
          <TextField
          required
          id="credit_card"
          label="Credit Card Number"
          name="credit_card"
          />
          <TextField
          required
          id="expiration_date"
          label="Expiration Date"
          name="expiration_date"
          />
          <TextField
          required
          id="cvv"
          label="CVV"
          name="cvv"
          />
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
          </Button>
        </form>
        </div>

      );
    }
}

export default Payment ;