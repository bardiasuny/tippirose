import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import { closeModal } from "./modalActions";

import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import LoginForm from "../Auth/LoginForm";

const actions = {
  closeModal
};

const useStyles = makeStyles(theme => ({}));

function LoginModal({ closeModal }) {
  const classes = useStyles();
  return (
    <Fragment>
      <LoginForm closeModal={closeModal} />
    </Fragment>
  );
}
export default connect(null, actions)(LoginModal);
