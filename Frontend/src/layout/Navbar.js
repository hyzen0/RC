import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import SideBar from "./SideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

const Navbar = (props) => {
  const { history } = props;
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar color="primary" elevation={2}>
          <Toolbar>
            {isMobile ? (
              <SideBar />
            ) : (
              <>
                <Typography className={classes.title} variant="h5">
                  Right Companion
                </Typography>
                <div className={classes.sectionDesktop}>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/")}
                  >
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/about")}
                  >
                    About Us
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/product")}
                  >
                    Products
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/meeting")}
                  >
                    Meeting
                  </Button>
                </div>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default withRouter(Navbar);
