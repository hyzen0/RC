import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

export default function BadgeAvatars(props) {
  const { name, spacing, fontSize } = props;

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
      width: theme.spacing(spacing),
      height: theme.spacing(spacing),
      fontSize: fontSize,
      textAlign: "center",
      textTransform: "capitalize !important",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.purple}>{name}</Avatar>
    </div>
  );
}
