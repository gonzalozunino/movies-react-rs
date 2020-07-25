import { red } from "@material-ui/core/colors";

export default (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  avatar: {
    backgroundColor: red[500],
  },
});
