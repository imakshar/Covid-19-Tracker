import React from "react";

/* -------------------------------------------------------------------------- */
/*                               App Boilerplate                              */
/* -------------------------------------------------------------------------- */

import { BrowserRouter as Router, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

import Home from "./components/Home";
import { theme } from "./theme.js";

import PublicRoute from "./components/Route/PublicRoute.js";
import WorldMap from "./components/Maps/WorldMap";
import Page404 from "./components/Page404";
import IndiaMap from "./components/Maps/IndiaMap";
import StaticsticsTable from "./components/StaticsticsTable";

function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider maxSnack={4}>
                    <Router>
                        <Switch>
                            <PublicRoute exact path="/" title="Home " component={Home}/>
                            <PublicRoute exact path="/world_map" title="Home " component={WorldMap}/>
                            <PublicRoute exact path="/india_map" title="Home " component={IndiaMap}/>
                            <PublicRoute exact path="/india_table" title="Home " component={StaticsticsTable}/>
                            <PublicRoute component={Page404} />
                        </Switch>
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
