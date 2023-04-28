import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import LocationCard from "../Components/Location/LocationCard";

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

// Getting the data from the JSON file.
export default function AllData() {
  const classes = useStyles();
  const history = useHistory();
  const [locationData, setLocationData] = useState([]);

  const deleteSensor = async (sensor_id) => {
    if(window.confirm("Are you sure want to delete?") == false) {
      return;
    }
    const formData = {
        sensor_id: sensor_id,
    };
    const settings = {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    };

    const response = await fetch("http://localhost:8000/api/sensorDataAPI/", settings);
    var data = await response.json();
    setLocationData([...data]);
}

  const getData = async () => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("http://localhost:8000/api/locationDataAPI/", settings);
    var data = await response.json();
    setLocationData([...data]);
    console.log(data);
  }

  useEffect(async () => {
    getData();
    const intervalCall = setInterval(() => {
      getData();
    }, 4000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);

  return (
    <React.Fragment>
      <Container>
        {(locationData.length == 0) ? <Typography
          variant="h5"
          align="left"
          component="h5"
          gutterBottom
          color="textSecondary"
        >
          Currently No Location Is Added!
        </Typography> : <Typography
          variant="h5"
          align="left"
          component="h5"
          gutterBottom
          color="textSecondary"
        >
          All Locations Data
        </Typography>}

        {locationData && locationData.map((location) => (
          <LocationCard key={location.id} location={location} deleteSensor={deleteSensor} />
        ))}

      </Container>
    </React.Fragment>

  );
}
