import React from "react";
import { Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import PublicNavBar from "../NavBar/PublicNavBar";

const Wrapper = (props) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <PublicNavBar />
            {props.children}
        </React.Fragment>
    );
};

const PublicRoute = (props) => {
    const Component = props.component || props.render;
    return (
        <Route
            exact={props.exact}
            path={props.path}
            render={(props) => (
                <Wrapper>
                    <Component {...props} />
                </Wrapper>
            )}
        />
    );
};

export default PublicRoute;
