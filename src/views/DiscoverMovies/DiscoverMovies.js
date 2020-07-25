import React, { useState, useEffect } from "react";
import { useStore } from "../../store";
import { setRating } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  CircularProgress,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import {
  MovieCreationOutlined as MovieCreationOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from "@material-ui/icons";
import axios from "axios";

import DiscoverMoviesStyles from "./DiscoverMoviesStyles";
import MovieCard from "../../components/MovieCard/MovieCard";
import api from "../../api";
import useDebounce from "../../hooks/useDebounce";

const useStyles = makeStyles(DiscoverMoviesStyles);

const DiscoverMovies = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [{ rating }, dispatch] = useStore();
  const ratingLabel = rating > 1 ? `${rating} stars` : `1 star`;
  const debouncedSearchTerm = useDebounce(searchValue);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = async () => {
      try {
        const discoveries = await api.get(
          "/discover",
          {
            sort_by: "popularity.desc",
          },
          { cancelToken: source.token }
        );

        setData(discoveries.data.results);
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
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchResults = async () => {
        const searchResults = await api.get("/search", {
          query: debouncedSearchTerm.trim().toLowerCase(),
        });

        setIsSearching(false);
        setSuggestions(searchResults.data.results);
      };

      setIsSearching(true);
      fetchResults();
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  const renderPopular = () => {
    const movies = rating ? filteredMovies : data;

    return (
      <>
        <Typography gutterBottom variant="h4" component="h2">
          <WhatshotIcon className={classes.icons} />
          Popular movies
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderSuggestions = () => {
    const movies = rating ? filteredMovies : suggestions;

    return (
      <>
        <Typography gutterBottom variant="h4" component="h2">
          <MovieCreationOutlinedIcon className={classes.icons} />
          Results
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  // Filtering only rated movies with at least one star
  const filterRating = (event, newValue) => {
    let movies = [];

    if (newValue) {
      movies = suggestions.length ? suggestions : data;
    }

    const filteredMovies = movies.filter(({ vote_average }) => {
      const rangeValue = newValue * 2;

      return vote_average > rangeValue - 2 && vote_average <= rangeValue;
    });

    setFilteredMovies(filteredMovies);
    dispatch(setRating(newValue));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchOutlinedIcon />
              </div>
              <InputBase
                placeholder="Search for a movie..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </IconButton>
          <div className={classes.root} />
          <IconButton
            className={classes.filterContainer}
            edge="end"
            color="inherit"
          >
            {rating > 0 && (
              <>
                <Chip
                  className={classes.filterApplied}
                  label={ratingLabel}
                  onDelete={(_) => filterRating(_, 0)}
                />
                <Divider orientation="vertical" flexItem />
              </>
            )}
            <Box
              className={classes.filter}
              component="fieldset"
              borderColor="transparent"
            >
              <Typography component="legend">Rating Filter</Typography>
              <Rating
                name="rating-controlled"
                disabled={rating > 0}
                value={rating}
                onChange={filterRating}
              />
            </Box>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Paper className={classes.content}>
        {(isSearching || !data.length) && (
          <CircularProgress color="secondary" />
        )}
        {!suggestions.length &&
          !isSearching &&
          data.length > 0 &&
          renderPopular()}
        {suggestions.length > 0 && !isSearching && renderSuggestions()}
      </Paper>
    </div>
  );
};

export default DiscoverMovies;
