import React, { useState } from "react";
import {
  Typography,
  IconButton,
  SwipeableDrawer,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { MdMenu } from "react-icons/md";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(() => ({
  list: {
    width: 200,
  },
  title: {
    flexGrow: 1,
  },
}));

const SideBar = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState(false);

  const showDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const menuItems = [
    {
      title: "Home",
      onClick: () => history.push("/"),
    },
    {
      title: "About Us",
      onClick: () => history.push("/about"),
    },
    {
      title: "Products",
      onClick: () => history.push("/product"),
    },
    {
      title: "Meeting",
      onClick: () => history.push("/meeting"),
    },
  ];

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={showDrawer}
      >
        <MdMenu />
      </IconButton>
      <Typography className={classes.title} align="center" variant="h5">
        Right Companion
      </Typography>
      <SwipeableDrawer
        variant="temporary"
        open={openSidebar}
        onOpen={showDrawer}
        onClose={handleSidebarClose}
      >
        <div
          role="presentation"
          onClick={handleSidebarClose}
          onKeyDown={handleSidebarClose}
          className={classes.list}
        >
          <List>
            {menuItems.map((item, index) => {
              const { title, onClick } = item;
              return (
                <ListItem button key={title} onClick={onClick}>
                  <ListItemText primary={title} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default withRouter(SideBar);
