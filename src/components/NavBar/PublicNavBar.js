import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const PublicNavBar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h4" color="textPrimary">
                    <strong>
                        <em>Covid-19 Tracker</em>
                    </strong>
                </Typography>
                <img src="covid.png" width={80} height={80} alt="Covid" />
            </Toolbar>
        </AppBar>
    );
};

export default PublicNavBar;
