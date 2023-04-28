import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  AddCircleOutlineOutlined,
  SubjectOutlined,
  LibraryBooksOutlined,
} from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { format } from "date-fns";
import logo from "../images/avatar.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    textStyle: {
      padding: theme.spacing(3),
    },
    active: {
      backgroundColor: "#FAA0A0",
    },
    appbar: {
      width: "calc(100% - " + drawerWidth + "px)",
      backgroundColor: "white"
    },
    toolbar: theme.mixins.toolbar,
    dateTime: {
      flexGrow: 1,
    },
    avatarImg: {
      marginLeft: theme.spacing(2),
    },
  };
});

const listItems = [
  {
    text: "My Data",
    icon: <SubjectOutlined color="secondary" />,
    path: "/",
  },
  {
    text: "Add Data",
    icon: <AddCircleOutlineOutlined color="secondary" />,
    path: "/createSensor",
  },
  {
    text: "Add Location",
    icon: <AddCircleOutlineOutlined color="secondary" />,
    path: "/createLocation",
  },
];

const days = {
  0:"Sunday",
  1:"Monday",
  2:"Tuesday",
  3:"Thursday",
  4:"Friday",
  5:"Saturday",
  6:"Sunday",
}
var date = new Date();
var day = days[date.getDay()];


export const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  return (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          {/* <Typography className={classes.dateTime}>
            {format(new Date(), "do MMMM Y") + " | " + day}
          </Typography> */}
          {/* <Typography>Aryan</Typography>
          <Avatar src={logo} className={classes.avatarImg} /> */}
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <div>
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <div>
            <Typography variant="h6" className={classes.textStyle}>
              
              <b>Blockchain based Data Moniter</b>
            </Typography>
          </div>

          {/* List / Links */}
          <List>
            {listItems.map((item, index) => (
              <ListItem
                key={item.text}
                button
                onClick={() => history.push(item.path)}
                className={
                  location.pathname == item.path ? classes.active : null
                }
              >
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                <ListItemText primary={`${index+1}. ${item.text}`} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};
