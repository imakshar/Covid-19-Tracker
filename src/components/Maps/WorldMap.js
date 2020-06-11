import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import {
    MapsComponent,
    LayersDirective,
    LayerDirective,
    Inject,
    Highlight,
    MapsTooltip,
    Legend,
} from "@syncfusion/ej2-react-maps";
import axios from "axios";
import { world_map } from "../../utils/WorldMap_Countries";
import { country_name } from "../../utils/CountryNameWithCode";
import Loading from "../Loader/Loading";
const WorldMap = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12}>
                    <Box ml={2} mt={4} display="flex" alignItems="center">
                        <Box>
                            <Typography variant="h4" color="textPrimary">
                                <strong>
                                    WorldWide COVID-19 Confirmed Cases
                                    Statistics...
                                </strong>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Box
                        mt={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                    >
                        <Map />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};
const Map = () => {
    const [World_data, setWorld_data] = useState([]);
    useEffect(() => {
        axios.get("https://covid19-api.org/api/status").then((response) => {
            let x = response.data.map((e) => {
                e["name"] = country_name[e.country];
                return e;
            });
            setWorld_data(x);
        });
        return () => {
            setWorld_data([]);
        };
    }, []);

    return World_data?.length ? (
        <Box width="100%">
            <MapsComponent legendSettings={{ visible: true }}>
                <Inject services={[Highlight, MapsTooltip, Legend]} />
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
            <div
                style={{
                    position: "absolute",
                    right: 120,
                    top: 0,
                    width: 300,
                }}
            >
                <img src="./covid.png" alt="covid" width={500} />
            </div>
        </Box>
    ) : (
        <Box width="100%" display="flex" justifyContent="center">
            <Loading />
        </Box>
    );
};
export default WorldMap;
