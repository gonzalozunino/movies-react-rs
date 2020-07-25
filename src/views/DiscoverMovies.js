import React, { useState, useEffect } from "react";
import { useStore } from "../store";
import { setRating } from "../actions";

import { fade, makeStyles } from "@material-ui/core/styles";
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

import MovieCard from "../components/MovieCard";
import api from "../api";
import useDebounce from "../hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  icons: {
    marginRight: theme.spacing(2),
    fontSize: 28,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  filterContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  filter: {
    flexGrow: 1,
  },
  filterApplied: {
    marginRight: theme.spacing(3),
  },
  toolbar: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
}));

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
