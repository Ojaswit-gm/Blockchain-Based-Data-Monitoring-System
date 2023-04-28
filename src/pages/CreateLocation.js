import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

const useStyles = makeStyles({
  btn: {
    color: "pink",
    backgroundColor: "blue",
    margin: "auto",
    "&:hover": {
      backgroundColor: "purple",
    },
  },
  title: {
    color: "blue",
    textDecoration: "underline",
  },
  field: {
    marginBottom: 21,
    marginLeft: 21,
  },
});

export default function CreateLocation() {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState([]);
//   const [sensorId, setSensorId] = useState("");
  const [location, setLocation] = useState("");

  const [nameError, setNameError] = useState(false);
//   const [sensorIdError, setSensorIdError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const clearText = () => {
    setName("");
    setLocation("");
    // setCategory(defaultCategory);
    setNameError(false);
    setLocationError(false);
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    setNameError(false);

    if (name == "") {
      setNameError(true);
    }

    if (location == "") {
      setLocationError(true);
    }

    if (name && location) {
      const formData = {
        name: name,
        location: location,
      };
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch("http://localhost:8000/api/locationDataAPI/", settings);
      if(response.status == 200) {
        alert("Location Added Succesfully!");
        clearText();
      } else {
        let data = await response.json();
        alert(data);
      }
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Typography
          className={classes.field}
          variant="h5"
          align="left"
          component="h5"
          gutterBottom
          color="textSecondary"
        >
          Add a New Location
        </Typography>

        <form
          action=""
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitEvent}
        >
          <TextField
            className={classes.field}
            onChange={(e) => setName(e.target.value)}
            label="Location Name"
            variant="outlined"
            fullWidth
            error={nameError}
            color="secondary"
            value={name}
            required
          />

          <Grid container spacing={2}>
            {/* <Grid item xs={6}>
              <TextField
                className={classes.field}
                onChange={(e) => setSensorId(e.target.value)}
                label="Sensor Id"
                variant="outlined"
                fullWidth
                error={sensorIdError}
                color="secondary"
                value={sensorId}
                required
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                className={classes.field}
                onChange={(e) => setLocation(e.target.value)}
                label="Location"
                variant="outlined"
                fullWidth
                error={locationError}
                color="secondary"
                value={location}
                required
              />
            </Grid>
          </Grid>

          <Button
            className={classes.field}
            type="submit"
            variant="contained"
            // disabled
            color="secondary"
          >
            Add Location
          </Button>
          <Button
            className={classes.field}
            // type="submit"
            onClick={clearText}
            variant="contained"
            // disabled
            color="secondary"
          >
            Reset Default
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
}