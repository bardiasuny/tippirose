import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import { connect } from "react-redux";

//actions

import { openModal } from "../../features/Modals/modalActions";
import { withRouter } from "react-router-dom";
import SubscribeEmail from "features/SubscribeEmail/SubscribeEmail";

const style = {};

const useStyles = makeStyles(style);

const actions = { openModal };

const mapState = (state) => ({
  auth: state.firebase.auth,
});

function UnderConstruction({ openModal, auth, history }) {
  const classes = useStyles();
  useEffect(() => {
    if (!auth.isEmpty && auth.isLoaded) {
      history.push("/home");
    }
  }, [auth]);
  return (
    <div className="page_wrapper under_construction">
      <div className="center_component underCunstruction_navbar">
        <h1 className="white">TIPPIROSE</h1>
        <Button onClick={() => openModal("LoginModal")} color="primary">
          {" "}
          LOG IN
        </Button>
      </div>
      <SubscribeEmail />
      <div className="under_construction_footer center_component">
        <div className="white">
          Email: <strong>hello@tippirose.com</strong>
        </div>
      </div>
    </div>
  );
}
export default connect(mapState, actions)(withRouter(UnderConstruction));
