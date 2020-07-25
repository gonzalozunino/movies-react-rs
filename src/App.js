import React from "react";
import { Route, Switch } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { StoreProvider } from "./store";
import reducers from "./reducers";
import initialState from "./store/initialState";

import Hero from "./components/Hero";
// Discover movies by different types of data like average rating, number of votes, genres and certifications.
import DiscoverMovies from "./views/DiscoverMovies";
// Get the primary information about a movie.
import MovieDetails from "./views/MovieDetails";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Users might have specified a preference for a light or dark theme.
  // This method can leverage this preference dynamically with the useMediaQuery hook and the prefers-color-scheme media query.
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
        typography: {
          fontFamily: [
            "Play",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
      }),
    [prefersDarkMode]
  );

  return (
    <StoreProvider initialState={initialState} reducer={reducers}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Hero />
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <DiscoverMovies {...props} />}
          />
          <Route
            exact
            path="/movie/:id"
            component={(props) => <MovieDetails {...props} />}
          />
        </Switch>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
