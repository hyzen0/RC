import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  purple: {
    color: theme.palette.getContrastText("#417dfd"),
    backgroundColor: "#417dfd",
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "16px",
  },
}));

export default function BadgeAvatars(props) {
  const { name } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.purple}>{name}</Avatar>
    </div>
  );
}
