import React from "react";
import {
    Card,
    CardHeader,
    makeStyles,
    Box,
    Typography,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions,
} from "@material-ui/core";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 10px -2px rgba(0, 0, 0, 0.2)",
        "&:hover": {
            cursor: "pointer",
            boxShadow:
                "0 6px 10px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
        },
        width: "100%",
        height: 500,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
}));
const clamp = (text, max = 150) => {
    text = text.toString();
    if (text.length > max) {
        text = text.substr(0, max) + "...";
    }
    return text;
};
const NewsCard = ({ data }) => {
    const { source, title, description, url, urlToImage, publishedAt } = data;
    const classes = useStyles();
    const handleClick = () => {
        window.open(url);
    };

    return (
        <Card raised className={classes.root} variant="outlined">
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    title={source.name}
                    subheader={moment(publishedAt).fromNow()}
                />
                <CardMedia
                    className={classes.media}
                    image={urlToImage}
                    title="Media"
                />
                <CardContent>
                    <Box>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            component="p"
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        paragraph
                        style={{ textOverflow: "ellipsis" }}
                    >
                        {clamp(description)}
                    </Typography>
                </CardContent>
                <CardActions></CardActions>
            </CardActionArea>
        </Card>
    );
};

NewsCard.defaultProps = {
    data: {
        source: {
            id: null,
            name: "Lifehacker.com",
        },
        author:
            "Rachel Fairbank on Vitals, shared by Rachel Fairbank to Lifehacker",
        title: "What Does It Mean to Have Recovered From COVID-19?",
        description:
            "In addition to the tally of confirmed COVID-19 cases, there is a secondary count of the number of people who have recovered from the infection. What does it mean, to be counted as someone who has recovered from COVID-19? What does that look like?Read more...",
        url:
            "https://vitals.lifehacker.com/what-does-it-mean-to-have-recovered-from-covid-19-1843856694",
        urlToImage:
            "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/qjjx4cu9aqfbis5ikn1f.jpg",
        publishedAt: "2020-06-02T19:30:00Z",
        content:
            "In addition to the tally of confirmed COVID-19 cases, there is a secondary count of the number of people who have recovered from the infection. What does it mean, to be counted as someone who has rec… [+3349 chars]",
    },
};
export default NewsCard;
