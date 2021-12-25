/*eslint-disable*/
import React, { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import axios from 'axios' ;
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";


// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();


  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="success"
          target="_blank"
          round
        >
          {/* WHEN SPRINT 3 IS HERE , PUT LINK TO USER REGISTER HERE*/}
          <Link style={{padding:0}} to="/login"  className={classes.dropdownLink}>
              Login
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="rose"
          target="_blank"
          round
        >
          {/* WHEN SPRINT 3 IS HERE , PUT LINK TO USER REGISTER HERE*/}
        <Link style={{padding:0}} to="/register" className={classes.dropdownLink}>
              Register
        </Link>
        </Button>
      </ListItem>
    </List>
  );
}
