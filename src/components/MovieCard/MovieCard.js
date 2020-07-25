import React from "react";
import { shape, string, number } from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import MovieCardStyles from "./MovieCardStyles";
import { IMAGE_URL_500 } from "../../utils/constants";

const useStyles = makeStyles(MovieCardStyles);

const MovieCard = ({
  movie: { id, title, poster_path, overview, vote_average },
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={RouterLink} to={`/movie/${id}`}>
        <CardMedia
          component="img"
          width={500}
          height={500}
          image={`${IMAGE_URL_500}${poster_path}`}
          alt={`${title} poster`}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
            <Rating
              className={classes.star}
              name="read-only"
              value={vote_average / 2}
              precision={0.1}
              readOnly
            />
          </Typography>
          <div className={classes.overview}>
            <Typography
              noWrap
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {overview}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: shape({
    title: string.isRequired,
    poster_path: string,
    vote_average: number.isRequired,
    overview: string.isRequired,
    id: number.isRequired,
  }).isRequired,
};

export default MovieCard;
