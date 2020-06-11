import React, { useState, useEffect } from "react";
import Datamap from "datamaps";
import codes from "../../utils/IndiaStateCodes";
import d3 from "d3";
import {
    makeStyles,
    Box,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import Axios from "axios";
import Loading from "../Loader/Loading";

const initial = {
    datamap: null,
};

const useStyles = makeStyles((theme) => ({
    nonDisplay: {
        display: "none",
    },
    onDisplay: {
        color: "black",
    },
}));
const IndiaMap = () => {
    const classes = useStyles();
    const [state, setState] = useState(initial);
    const [state_data, setState_data] = useState([]);
    const [bubbles, setBubbles] = useState([]);
    const [element] = useState(React.createRef());
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get("/state_data").then((response) => {
            setLoading(false);
            setState_data(response.data[1].state_data);
        });
        return () => {
            setState(initial);
            setState_data([]);
            setBubbles([]);
        };
    }, []);

    useEffect(() => {
        renderDataMaps("india");
    }, [state_data]);

    const renderDataMaps = async (scope) => {
        let existing = document.querySelectorAll(".datamap");

        existing.forEach((node) => node.parentNode.removeChild(node));
        let data = {};
        state_data.forEach((e) => {
            let key = codes[e.state];
            let status = "";
            if (e.confirmed < 1000) {
                status = "MINOR";
            } else if (e.confirmed > 1001 && e.confirmed < 5000) {
                status = "MINOR_UP";
            } else if (e.confirmed > 5001 && e.confirmed < 10000) {
                status = "MEDIUM";
            } else if (e.confirmed > 10001) {
                status = "MAJOR";
            }
            data = {
                ...data,
                [key]: {
                    fillKey: status,
                },
            };
            setBubbles((b) => [
                ...b,
                {
                    centered: key,
                    fillKey: status,
                    radius: 10,
                    state: e.state,
                    active: e.active,
                    active_rate: e.active_rate + "%",
                    confirmed: e.confirmed,
                    death_rate: e.death_rate + "%",
                    deaths: e.deaths,
                    recovered: e.recovered,
                    recovered_rate: e.recovered + "%",
                },
            ]);
        });
        await setState({
            datamap: new Datamap({
                element: element.current,
                scope,
                geographyConfig: {
                    popupOnHover: true,
                    highlightOnHover: true,
                    borderColor: "#444",
                    textColor: "black",
                    borderWidth: 0.5,
                    dataUrl:
                        "https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json",
                },
                fills: {
                    MINOR: "#2e7d32",
                    MINOR_UP: "#ffeb3b",
                    MEDIUM: "#ff6f00",
                    MAJOR: "#dd2c00",
                    defaultFill: "#dddddd",
                },
                data,
                setProjection: function (element) {
                    var projection = d3.geo
                        .mercator()
                        .center([78.9629, 23.5937]) // always in [East Latitude, North Longitude]
                        .scale(1000);
                    var path = d3.geo.path().projection(projection);
                    return { path: path, projection: projection };
                },
            }),
        });
    };
    useEffect(() => {
        if (state.datamap) {
            setTimeout(() => {
                // only start drawing bubbles on the map when map has rendered completely.
                state.datamap.bubbles(bubbles, {
                    popupTemplate: function (geo, data) {
                        return `<div class="hoverinfo">
                            <ui>
                                <li>City:${data.state} </li>    
                                <li>Active Rate:${data.active_rate} </li>    
                                <li>Confirmed:${data.confirmed} </li>    
                                <li>Death Rate:${data.death_rate} </li>    
                                <li>Deaths:${data.deaths} </li>    
                                <li>Recovered:${data.recovered} </li>    
                            </ui>
                        </div>`;
                    },
                });
            }, 1000);
        }
    }, [state.datamap, bubbles]);

    return (
        <Grid container>
            <Grid item sm={12} md={12}>
                <Box px={4} pt={2}>
                    <Typography color="textPrimary" variant="h4">
                        <strong>India COVID-19 Statistics...</strong>
                    </Typography>
                </Box>
            </Grid>
            <Grid item sm={12} md={4}>
                {!loading ? (
                    <Box pl={6} mt={14} width="100%">
                        <List>
                            <ListItem
                                style={{
                                    background: "#2e7d32",
                                    color: "black",
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <strong>Confirmed Cases 0-1000</strong>
                                    }
                                />
                            </ListItem>
                            <ListItem
                                style={{
                                    background: "#ffeb3b",
                                    color: "black",
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <strong>
                                            Confirmed Cases 1001-5000
                                        </strong>
                                    }
                                />
                            </ListItem>
                            <ListItem
                                style={{
                                    background: "#ff6f00",
                                    color: "black",
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <strong>
                                            Confirmed Cases 5001-10000
                                        </strong>
                                    }
                                />
                            </ListItem>
                            <ListItem
                                style={{
                                    background: "#dd2c00",
                                    color: "black",
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <strong>
                                            Confirmed Cases Above 10000
                                        </strong>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                ) : null}
            </Grid>
            <Grid item sm={12} md={8}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    flexWrap="wrap"
                >
                    <Box pt={2}>
                        <div
                            className={
                                loading ? classes.nonDisplay : classes.onDisplay
                            }
                            ref={element}
                            style={{ height: 550, width: 900 }}
                        ></div>
                    </Box>
                </Box>
            </Grid>

            <Grid item sm={12} md={12}>
                <Box pt={12} display="flex" justifyContent="center">
                    {loading ? <Loading /> : null}
                </Box>
            </Grid>
        </Grid>
    );
};

export default IndiaMap;
