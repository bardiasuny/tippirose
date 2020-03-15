import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import ModalManager from "./features/Modals/ModalManager";


//pages

import Shop from "./pages/Shop/Shop"
import Admin from "./pages/Admin/AdminPage"

import { Route, withRouter, Link, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';


import { connect } from 'react-redux';
import TippiVipFrontShow from 'pages/TippitVipFront/TippiVipFrontShow';
import TippiVipDashboard from 'pages/TippiVipAcount/TippiVipDashboard';
import TippiMyProfile from 'pages/TippiVipAcount/TippiMyProfile';
import TippiManageProfile from 'pages/TippiVipAcount/TippiManageProfile';
import UnderConstruction from 'pages/Homepage/UnderCunstruction';

const mapState = state => ({
  auth: state.firebase.auth,
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


function App({ auth, match, admin, isVip, history }) {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <ModalManager />
        <Switch>


          <Route exact path="/" component={UnderConstruction} />
          <Route path="/vip/:upId" component={TippiVipFrontShow} />
          {!auth.isEmpty && auth.isLoaded &&
            <Switch>
              <Route path="/shop" component={Shop} />
              <Route exact path="/home" component={Homepage} />
              {admin && <Route path="/admin" component={Admin} />}
              {isVip && <Route exact path="/account/vip/" component={TippiVipDashboard} />}
              {isVip && <Route exact path="/account/vip/my-products" component={TippiVipDashboard} />}
              {isVip && <Route exact path="/account/vip/profiles" component={TippiMyProfile} />}
              {isVip && <Route exact path="/account/vip/profiles/manage" component={TippiManageProfile} />}
              {isVip && <Route path="/account/vip/profiles/manage/:profile" component={TippiManageProfile} />}
              {!match.isExact && <Route render={() => <Fragment> <h1>NOT FOUND</h1><Link to="/shop">Shop</Link>- <Link to="/admin">Admin</Link></Fragment>} />}
            </Switch>}
        </Switch>
      </div>
    </Fragment >
  );
}

export default connect(mapState)(withRouter(App));
