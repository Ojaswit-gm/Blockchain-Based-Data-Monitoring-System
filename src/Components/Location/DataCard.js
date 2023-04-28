import { Container, Grid, IconButton, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core";
import { DeleteOutlined } from '@material-ui/icons';
import GaugeChart from 'react-gauge-chart'

const useStyles = makeStyles({
    container: {
        backgroundColor: "#D3D3D3",
        margin: "10px 5px",
        padding: "10px",
        borderRadius: "3px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        borderLeft: "3px solid #C41E3A",
    },
    title: {
        color: "green",
        textDecoration: "underline",
    },
    field: {
        marginBottom: 21,
    },
    dataText: {
        fontSize: "1.7rem",
        fontWeight: 600,
    },
    badge: {
        // padding: "0px 3px",
        borderRadius: "5px",
        textAlign: 'center',
        margin: "auto",
    }
});



const DataCard = ({ data }) => {
    const classes = useStyles();
    const [gaugeValue, setGaugeValue] = useState(0);

    useEffect(() => {
        setGaugeValue(0.67);
        console.log(data.isActive);
    }, [data])

    return (
        <React.Fragment>
            <Container className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Typography style={{fontSize: "1.2rem"}}>{data.name} </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <div className={classes.badge} style={{backgroundColor: data.isActive ? "#2E8B57" : "#ff1744"}}>
                            <Typography style={{fontSize: "0.8rem"}}>{data.isActive ? "Active" : "Not Active"}</Typography>
                        </div> 
                    </Grid>
                </Grid>
                <Typography className={classes.dataText}>{`${data.value.toFixed(2)}${data.unit}`}</Typography>
                {/* <GaugeChart id="gauge-chart5"
                    nrOfLevels={420}
                    arcsLength={[0.3, 0.5, 0.2]}
                    colors={['#5BE12C', '#F5CD19', '#EA4228']}
                    percent={gaugeValue}
                    // formatTextValue=
                    arcPadding={0.02}
                    animate={false} 
                /> */}
            </Container>
        </React.Fragment>
    )
}

export default DataCard