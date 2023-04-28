import { Container, Grid, IconButton, Typography } from '@material-ui/core'
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { DeleteOutlined, AddCircleOutline } from '@material-ui/icons';
// import AddSensorCard from '../Sensor/AddSensorCard';
import SensorCard from '../Sensor/SensorCard';
import { de } from 'date-fns/locale';
import DataCard from './DataCard';

const useStyles = makeStyles({
    container: {
        backgroundColor: "#E5E4E2",
        margin: "10px 0px",
        padding: "10px",
        borderRadius: "3px",
        border: "2px solid black",
        borderLeft: "3px solid #C41E3A",
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

function getData(sensors_set) {
    var AvgData = [];
    var activeSensors = 0;
    sensors_set.map((data) => {
        var temp = 0;
        var currDateTime = new Date();
        var cutOffTime = 15 // In seconds
        var isActive = false;
        data.live_sensors_set.map((liveSensor) => {
            temp += parseInt(liveSensor.data);
            if (currDateTime - new Date(liveSensor.timestamp) <= cutOffTime * 1000) {
                // Sensor is active
                isActive = true;
                activeSensors += 1;
            } else {
                // Sensor is not active
                isActive = false;
            }
        })
        temp = temp != 0 ? temp / (data.live_sensors_set.length) : 0;
        var obj = {
            id: data.sensor_id,
            name: `Avg. ${data.name}`,
            unit: data.unit,
            value: temp,
            isActive: isActive,
        }
        AvgData.push(obj);
    })
    return AvgData;
}

function decrypt(key, ciphertext) {
    let plaintext = '';
    for (let i = 0; i < ciphertext.length; i++) {
        const key_c = key.charCodeAt(i % key.length);
        const ciphertext_c = ciphertext.charCodeAt(i);
        plaintext += String.fromCharCode((ciphertext_c - key_c) % 256);
    }
    return plaintext;
}

function decryptData(sensors_data) {
    var mainLst = sensors_data;
    mainLst.map((sensor) => {
        sensor.live_sensors_set.map((liveSensor) => {
            liveSensor.data = decrypt("user1key", liveSensor.data);
        })
    })
    return mainLst
}

const LocationCard = ({ location, deleteSensor }) => {
    const classes = useStyles();
    const [decryptedData, setDecryptedData] = useState([]);
    const [avgData, setAvgData] = useState(getData(decryptedData));


    useEffect(async () => {
        setDecryptedData(decryptData(location.sensors_set))
        // if(decryptedData.length !=0) {
            // console.log("HERE", decryptedData);
            setAvgData(getData(decryptedData));
        // }
    }, [location]);

    return (
        <React.Fragment>
            <Container className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Typography>Location Name: {location.name}</Typography>
                        <Typography>Address: {location.location}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Total Sensors: {location.sensors_set.length}</Typography>
                        <Typography>Location ID: {location.locId}</Typography>
                    </Grid>
                </Grid>

                {/* <Grid container spacing={2}>
                    {avgData && avgData.map((data) => (
                        <Grid key={data.id} item xs={3}>
                            <DataCard data={data} />
                        </Grid>
                    ))}
                </Grid> */}

                <Grid container spacing={2}>
                    {decryptedData && decryptedData.map((sensor) => (
                        <Grid key={sensor.sensor_id} item xs={6}>
                            <SensorCard sensor={sensor} deleteSensor={deleteSensor} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default LocationCard