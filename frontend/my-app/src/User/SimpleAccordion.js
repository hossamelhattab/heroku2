import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ViewFlight from './ViewFlight';
import ViewFlight2 from './ViewFlight2';
import Summary from './Summary';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function SimpleAccordion(props) {


  return (    

    <div>
      <Accordion elevation={3}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Depature Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ViewFlight2 id={props.id}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={3}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Return Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ViewFlight2 id={props.secondFlight}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={3}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Additional Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Summary fSeats={props.firstSeats} sSeats={props.secondSeats} firstId={props.id} 
                    secondId={props.secondFlight} handleClick={props.getPrice}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}