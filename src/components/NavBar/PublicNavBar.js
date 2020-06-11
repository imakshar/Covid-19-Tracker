import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const PublicNavBar = () => {
    const history = useHistory();
    const handleClick = (key) => (event) => {
        if (key === "home") {
            history.push("/");
        } else if (key === "wm") {
            history.push("/world_map");
        } else if (key === "im") {
            history.push("/india_map");
        } else if (key === "st") {
            history.push("/india_table");
        }
    };
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box display="flex" alignItems="center" width="100%">
                    <Box>
                        <Typography variant="h4" color="textPrimary" noWrap>
                            <strong>
                                <em>Covid-19 Tracker</em>
                            </strong>
                        </Typography>
                    </Box>
                    <Box flexGrow={1}>
                        <img
                            src="covid.png"
                            width={80}
                            height={80}
                            alt="Covid"
                        />
                    </Box>
                    <Box p={1}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClick("home")}
                        >
                            Home
                        </Button>
                    </Box>
                    <Box p={1}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClick("wm")}
                        >
                            World Map
                        </Button>
                    </Box>
                    <Box p={1}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClick("im")}
                        >
                            India Map
                        </Button>
                    </Box>
                    <Box p={1}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClick("st")}
                        >
                            India Staticstics
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default PublicNavBar;
