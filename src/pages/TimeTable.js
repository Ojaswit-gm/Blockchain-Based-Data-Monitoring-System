import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import timeTable from "../images/TimeTable.png";

const useStyles = makeStyles({
  timetable: {
    width: "90%",
    height: "90%",
  },
  buttonGrid: {
    padding: 30,
  },
});


export const TimeTable = () => {
  const classes = useStyles();
  return (
    <Container>
      <Typography>Time Table is here</Typography>
    </Container>
  );
};
