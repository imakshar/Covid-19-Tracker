import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Grid, Box } from "@material-ui/core";
import CustomMaterialTable from "./CustomMaterialTable";
import Loading from "./Loader/Loading";

const StaticsticsTable = () => {
    const [states, setStates] = useState([]);
    const [state, setState] = useState(null);
    useEffect(() => {
        Axios.get("https://api.covidindiatracker.com/state_data.json").then(
            (res) => {
                setStates(res.data);
            }
        );
    }, []);
    const handleRowClick = (event, rowData) => {
        setState(rowData.state);
    };
    const handleFreeActionClick = (event) => {
        setState(null);
    };
    return (
        <Grid container spacing={2}>
            <Grid item sm={12} md={12}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    mt={2}
                >
                    <Box width="100%" px={4}>
                        {states.length ? (
                            <CustomMaterialTable
                                title={"State wise Covid-19 staticstics"}
                                columns={[
                                    {
                                        title: "State",
                                        field: "state",
                                    },
                                    {
                                        title: "Active",
                                        field: "active",
                                    },
                                    {
                                        title: "Confirmed",
                                        field: "confirmed",
                                    },
                                    {
                                        title: "Recovered",
                                        field: "recovered",
                                    },
                                    {
                                        title: "Deaths",
                                        field: "deaths",
                                    },
                                ]}
                                data={states}
                                onRowClick={handleRowClick}
                                action
                            />
                        ) : (
                            <Loading />
                        )}
                    </Box>
                </Box>
            </Grid>
            {state ? (
                <Grid item sm={12} md={12}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        mt={2}
                    >
                        <Box width="100%" px={4}>
                            <CustomMaterialTable
                                title={`${state} Covid-19 staticstics `}
                                columns={[
                                    {
                                        title: "Name",
                                        field: "name",
                                    },
                                    {
                                        title: "Confirmed",
                                        field: "confirmed",
                                    },
                                ]}
                                data={
                                    states.find((s) => s.state === state)
                                        .districtData
                                }
                                freeAction
                                onFreeActionClick={handleFreeActionClick}
                            />
                        </Box>
                    </Box>
                </Grid>
            ) : null}
        </Grid>
    );
};

export default StaticsticsTable;
