import { fade } from "@material-ui/core/styles";

export default (theme) => ({
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
});
