import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";

import MovieDetailsStyles from "./MovieDetailsStyles";
import api from "../../api";
import { IMAGE_URL_ORIGINAL } from "../../utils/constants";

const useStyles = makeStyles(MovieDetailsStyles);

const MovieDetails = ({
  match: {
    params: { id },
  },
}) => {
  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = async () => {
      try {
        const movie = await api.get(
          "",
          {},
          { cancelToken: source.token },
          `/${id}`
        );

        setData(movie.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    fetchData();
    return () => {
      source.cancel();
    };
  }, [id]);

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          {!data && <CircularProgress color="secondary" />}
          {data && (
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="rating" className={classes.avatar}>
                    {data.vote_average}
                  </Avatar>
                }
                title={
                  <Typography gutterBottom variant="h4">
                    {data.title}
                  </Typography>
                }
                subheader={
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography variant="subtitle1" display="block">
                        Release date: {data.release_date}
                      </Typography>
                      <Typography variant="subtitle1" display="block">
                        Running Time: {data.runtime} mins
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" display="block">
                        Budged: ${data.budget}
                      </Typography>
                      <Typography variant="subtitle1" display="block">
                        Revenue: ${data.revenue}
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
              <CardMedia
                component="img"
                image={`${IMAGE_URL_ORIGINAL}${data.poster_path}`}
                alt={`${data.title} poster`}
                title={data.title}
              />
              <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                  {data.overview}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieDetails;
