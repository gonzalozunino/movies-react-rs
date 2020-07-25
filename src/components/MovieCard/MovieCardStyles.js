export default (theme) => ({
  root: {
    position: "relative",
    maxWidth: 345,
    display: "flex",
  },
  overview: {
    textOverflow: "ellipsis",
  },
  rating: {
    marginLeft: theme.spacing(2),
  },
  star: {
    fontSize: 12,
    marginLeft: theme.spacing(2),
  },
});
