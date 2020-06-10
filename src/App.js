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
                        </Switch>
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
