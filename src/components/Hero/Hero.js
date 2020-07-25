import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

import HeroStyles from "./HeroStyles";

const useStyles = makeStyles(HeroStyles);

const Hero = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.hero}>
      <Typography
        className={classes.link}
        component={RouterLink}
        to="/"
        variant="h5"
        color="inherit"
      >
        Rockstart Movies
      </Typography>

      <Grid
        className={classes.welcome}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography component="h1" variant="h3" color="inherit">
            Your favourite movies.
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Figure out what happened. Then find out why.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Hero;
