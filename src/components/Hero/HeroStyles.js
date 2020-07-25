export default (theme) => ({
  hero: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    padding: theme.spacing(6),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: 0,
    background: `linear-gradient(60deg, #2B2E4A 0%, 
          #2B2E4A 30%, #E84545 calc(30% + 1px), 
          #E84545 60%, #903749 calc(60% + 1px), 
          #903749 70%, #53354A calc(70% + 1px), 
          #53354A 100%
          )`,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  icon: {
    marginRight: theme.spacing(2),
    fontSize: 28,
  },
  link: {
    textDecoration: "none",
  },
  welcome: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});
