import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@material-ui/core";
import {
    MapsComponent,
    LayersDirective,
    LayerDirective,
    Inject,
    Highlight,
    MapsTooltip,
} from "@syncfusion/ej2-react-maps";
import axios from "axios";
import { world_map } from "../../utils/WorldMap_Countries";
import { country_name } from "../../utils/CountryNameWithCode";
import Loading from "../Loader/Loading";
const WorldMap = () => {
    const [World_data, setWorld_data] = useState([]);
    useEffect(() => {
        axios.get("https://covid19-api.org/api/status").then((response) => {
            let x = response.data.map((e) => {
                e["name"] = country_name[e.country];
                return e;
            });
            setWorld_data(x);
        });
    }, []);
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12}>
                    <Box ml={2} mt={4} display="flex" alignItems="center">
                        <Box>
                            <Typography variant="h4" color="textPrimary">
                                <strong>WorldWide COVID-19 Statistics.</strong>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Box
                        mt={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                    >
                        {World_data?.length ? (
                            <>
                                <Box width="100%">
                                    <MapsComponent>
                                        <Inject
                                            services={[Highlight, MapsTooltip]}
                                        />
                                        <LayersDirective>
                                            <LayerDirective
                                                shapeData={world_map}
                                                dataSource={World_data}
                                                shapePropertyPath="name"
                                                shapeSettings={{
                                                    colorValuePath: "cases",
                                                    fill: "#E5E5E5",
                                                    colorMapping: [
                                                        {
                                                            from: 0,
                                                            to: 500,
                                                            color: "#2e7d32",
                                                        },
                                                        {
                                                            from: 501,
                                                            to: 1000,
                                                            color: "#1b5e20",
                                                        },
                                                        {
                                                            from: 1001,
                                                            to: 10000,
                                                            color: "#ffeb3b",
                                                        },
                                                        {
                                                            from: 10001,
                                                            to: 50000,
                                                            color: "#ff6f00",
                                                        },
                                                        {
                                                            from: 50001,
                                                            to: 100000,
                                                            color: "#fbc02d",
                                                        },
                                                        {
                                                            from: 100001,
                                                            to: 1000000,
                                                            color: "#ff3d00",
                                                        },
                                                        {
                                                            from: 1000001,
                                                            to: 10000000,
                                                            color: "#dd2c00",
                                                        },
                                                    ],
                                                }}
                                                highlightSettings={{
                                                    enable: true,
                                                    fill: "black",
                                                    border: {
                                                        color: "white",
                                                        width: 2,
                                                    },
                                                }}
                                                tooltipSettings={{
                                                    visible: true,
                                                    valuePath: "name",
                                                }}
                                            ></LayerDirective>
                                        </LayersDirective>
                                    </MapsComponent>
                                </Box>

                                <div
                                    style={{
                                        position: "absolute",
                                        left: 20,
                                        top: 200,
                                        width: 300,
                                    }}
                                >
                                    <Typography variant="h5" color="primary">
                                        <strong>Confirmed Cases</strong>
                                    </Typography>
                                    <List>
                                        <ListItem
                                            style={{
                                                background: "#2e7d32",
                                            }}
                                        >
                                            <ListItemText primary="0 to 500 " />
                                        </ListItem>
                                        <Divider />
                                        <ListItem
                                            style={{
                                                background: "#1b5e20",
                                            }}
                                        >
                                            <ListItemText primary="5001 to 1000 " />
                                        </ListItem>
                                        <Divider />
                                        <ListItem
                                            style={{
                                                background: "#ffeb3b",
                                            }}
                                        >
                                            <ListItemText primary="1001 to 10000 " />
                                        </ListItem>
                                        <Divider />
                                        <ListItem
                                            style={{
                                                background: "#ff6f00",
                                            }}
                                        >
                                            <ListItemText primary="10001 to 50000 " />
                                        </ListItem>
                                        <Divider />
                                        <ListItem
                                            style={{
                                                background: "#fbc02d",
                                            }}
                                        >
                                            <ListItemText primary="50001 to 100000 " />
                                        </ListItem>
                                        <Divider />
                                        <ListItem
                                            style={{
                                                background: "#ff3d00",
                                            }}
                                        >
                                            <ListItemText primary="100001 to 1000000 " />
                                        </ListItem>
                                        <Divider />
                                        <ListItem
                                            style={{
                                                background: "#dd2c00",
                                            }}
                                        >
                                            <ListItemText primary="1000001 to 10000000 " />
                                        </ListItem>
                                    </List>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        right: 120,
                                        top: 0,
                                        width: 300,
                                    }}
                                >
                                    <img
                                        src="./covid.png"
                                        alt="covid"
                                        width={500}
                                    />
                                </div>
                            </>
                        ) : (
                            <Box width="100%" display="flex" justifyContent="center">
                                <Loading />
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default WorldMap;
