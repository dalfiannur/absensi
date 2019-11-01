import * as React from 'react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Route, RouteProps } from 'react-router';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import PeopleIcon from '@material-ui/icons/People'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import HomeIcon from '@material-ui/icons/Home'
import { styles } from './styles';
import history from 'utils/history'

interface DashboardProps extends RouteProps {

}

const Dashboard: React.SFC<DashboardProps> = (props) => {
  const classes = styles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      history.push('/login')
    }
  })

  const handleLink = (routePath: string) => {
    history.push(routePath);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ABSENSI PESERTA MTGA
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => handleLink('/admin')} >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem button onClick={() => handleLink('/admin/presence')} >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={'Presence'} />
          </ListItem>
          <ListItem button onClick={() => handleLink('/admin/departement')} >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={'Departement'} />
          </ListItem>
          <ListItem button onClick={() => handleLink('/admin/presence-type')} >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={'Presence Type'} />
          </ListItem>
          <ListItem button onClick={() => handleLink('/admin/user')} >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={'User Management'} />
          </ListItem>
          <ListItem button onClick={() => handleLink('/admin/user-role')} >
            <ListItemIcon>
              <AccessibilityIcon />
            </ListItemIcon>
            <ListItemText primary={'User Roles'} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path={props.path} component={props.component} />
      </main>
    </div>
  )
}

export default Dashboard;