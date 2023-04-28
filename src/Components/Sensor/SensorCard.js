import { Container, Grid, IconButton, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core";
import { DeleteOutlined } from '@material-ui/icons';
import SensorCardGraph from './SensorCardGraph';

const useStyles = makeStyles({
    container: {
        // backgroundColor: "grey",
        margin: "10px 0px",
        padding: "10px",
        borderRadius: "3px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        border: "2px solid black",
    },
    title: {
        color: "#097969",
        textDecoration: "underline",
    },
    field: {
        marginBottom: 21,
        marginLeft: 21,
    },
    dataText: {
        fontSize: "2.4rem",
        fontWeight: 600,
    },
});



const SensorCard = ({ sensor, deleteSensor }) => {
    const [liveData, setLiveData] = useState("-");
    const [liveTime, setLiveTime] = useState("-");
    const [liveDate, setLiveDate] = useState("-");

    useEffect(() => {
        if(sensor.live_sensors_set.length!=0) {
            // setLiveTime(new Date(sensor.live_sensors_set[sensor.live_sensors_set.length - 1]['timestamp']).toLocaleTimeString())
            // setLiveDate(new Date(sensor.live_sensors_set[sensor.live_sensors_set.length - 1]['timestamp']).toDateString())
            setLiveData(`${sensor.live_sensors_set[sensor.live_sensors_set.length - 1]['data']}${sensor.unit}`);
        }
    }, [sensor])

    const classes = useStyles();
    return (
        <React.Fragment>
            <Container className={classes.container}>
                <Typography style={{fontSize: "1.5rem", fontWeight: 600}}>{sensor.name} Sensor</Typography>
                <hr style={{border: "1px solid #097969", background: "	#0BDA51"}}></hr>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography style={{fontSize: "0.8rem", fontColor: "#a7a7a7"}}>Id: {sensor.sensor_id}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{fontSize: "0.8rem", fontColor: "#a7a7a7"}}><i className="fa-regular fa-clock"></i> {`${liveTime} | ${liveDate}`}</Typography>
                    </Grid>
                </Grid>
                <Typography className={classes.dataText}> {liveData}</Typography>
                {sensor.live_sensors_set && <SensorCardGraph sensor={sensor}/>}
                <IconButton onClick={() => deleteSensor(sensor.sensor_id)}>
                    <DeleteOutlined />
                </IconButton>
            </Container>
        </React.Fragment>
    )
}

export default SensorCard