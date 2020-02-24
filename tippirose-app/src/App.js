import React, { Fragment } from 'react';
import SignInSide from "./pages/SignInSide"
import { makeStyles } from "@material-ui/core/styles";

import ModalManager from "./features/Modals/ModalManager";
import classNames from "classnames"



import NavBar from "./components/Nav/MainNavBar/NavBar"

//pages

import Shop from "./pages/Shop/Shop"
import Admin from "./pages/Admin/AdminPage"

import { Box, NoSsr, Hidden } from '@material-ui/core';
import { Route, withRouter, Link, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';

import MainFooter from './features/Footer/MainFooter'
import { connect } from 'react-redux';
import TippiVipFrontShow from 'pages/TippitVipFront/TippiVipFrontShow';
import TippiVipDashboard from 'pages/TippiVipAcount/TippiVipDashboard';

const mapState = state => ({
  admin: state.firebase.profile.role === "admin",
  isVip: state.firebase.profile.level && state.firebase.profile.level === "vip"
})

const styles = {

  root: {
    margin: "0 auto",
    width: ' 80%',
    marginTop: 30
  },
  wrapper: {
    maxWidth: '100vw',
    overflow: "hidden"
  },
  navMainAlign: {
    width: '100%',
    height: 100,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10
  },
  navCenter: {
    width: '85%',
    margin: '0 auto',
  },
  header: {
    height: 600,
    width: '100%',
    overflow: 'hidden'
  },
  centerContent: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
  },
  white: {
    color: "white!important"
  }
};
const useStyles = makeStyles(styles)


function App({ match, admin, isVip, history }) {
  const classes = useStyles();
  console.log(history)
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={Shop} />
          <Route path="/vip/:uid/:upId" component={TippiVipFrontShow} />
          {admin && <Route path="/admin" component={Admin} />}
          {isVip && <Route path="/account/vip/" component={TippiVipDashboard} />}
          {!match.isExact && <Route render={() => <Fragment> <h1>NOT FOUND</h1><Link to="/shop">Shop</Link>- <Link to="/admin">Admin</Link></Fragment>} />}
        </Switch>
      </div>
    </Fragment >
  );
}

export default connect(mapState)(withRouter(App));
