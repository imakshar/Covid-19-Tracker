import React, { useEffect, useState, lazy, Suspense } from "react";
import {
    Box,
    Typography,
    Grid,
    Button,
    ListItem,
    ListItemText,
    ListItemIcon,
    Icon,
} from "@material-ui/core";
import Axios from "axios";
import Loading from "./Loader/Loading";
import NewsCard from "./NewsCard";
import moment from "moment";
const CustomMaterialTable = lazy(() => import("./CustomMaterialTable"));
const Home = () => {
    const [helpLineNumbers, setHelpLineNumbers] = useState([]);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        Axios.get("/helpline_numbers").then((res) => {
            setHelpLineNumbers(res.data[1].contact_details);
        });
        fetchNews();
        return () => {
            setHelpLineNumbers([]);
            setArticles([]);
        };
    }, []);

    const handleFetchMore = () => {
        fetchNews();
    };
    const fetchNews = () => {
        Axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: "COVID",
                from: moment().startOf("week").format("YYYY-MM-DD"),
                pageSize: 12,
                page,
                apiKey: "4040bb2b502d4808913e846fbd31cbef",
            },
        }).then((res) => {
            setPage(page + 1);
            setArticles((a) => [...a, ...res.data.articles]);
        });
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12}>
                    <Box
                        display="flex"
                        width="100%"
                        alignItems="center"
                        flexDirection="row-reverse"
                        pt={2}
                    >
                        <Box px={2}>
                            <Typography>Toll Free {1075}</Typography>
                        </Box>
                        <Box>
                            <Typography>Helpline +91-11-23978046</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Box width="100%" px={3}>
                        <ListItem>
                            <ListItemIcon>
                                <Icon fontSize="large">local_hospital</Icon>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                    >
                                        Helpline Numbers
                                    </Typography>
                                }
                                disableTypography
                            />
                        </ListItem>
                    </Box>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        mt={2}
                    >
                        <Box width="100%" px={4}>
                            <Suspense fallback={<Loading />}>
                                {helpLineNumbers.length ? (
                                    <CustomMaterialTable
                                        title="State / Union territory Helpline Numbers"
                                        columns={[
                                            {
                                                title: "State/UT",
                                                field: "state_or_UT",
                                            },
                                            {
                                                title: "Helpline Number",
                                                field: "helpline_number",
                                            },
                                        ]}
                                        data={helpLineNumbers}
                                    />
                                ) : (
                                    <Loading />
                                )}
                            </Suspense>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Box width="100%" px={3}>
                        <ListItem>
                            <ListItemIcon>
                                <Icon fontSize="large">menu_book</Icon>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                    >
                                        Articles
                                    </Typography>
                                }
                                disableTypography
                            />
                        </ListItem>
                    </Box>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Box width="100%" px={4} mb={4}>
                        {articles.length ? (
                            <Grid container spacing={2}>
                                {articles.map((e, i) => (
                                    <Grid key={i} item sm={12} md={4}>
                                        <NewsCard data={e} />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Loading />
                        )}
                    </Box>
                    {articles.length > 10 ? (
                        <Box
                            display="flex"
                            alignItems="center"
                            px={4}
                            mb={4}
                            flexDirection="row-reverse"
                            width="100%"
                        >
                            <Box>
                                <Button onClick={handleFetchMore}>
                                    Fetch more...
                                </Button>
                            </Box>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
