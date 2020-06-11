import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";

const Page404 = () => {
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
                                <em>Opps, 404 Not Found.</em>
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Page404;
