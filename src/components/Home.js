import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
const Home = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12}>
                    <Box
                        mt={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                    >
                        <Typography variant="h4" color="textPrimary">
                            <strong>
                                <em>React is Beautiful!</em>
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
