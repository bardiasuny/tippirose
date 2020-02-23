import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import { closeModal } from "./modalActions";

import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import SignUpForm from "../Auth/SignUpForm";

const actions = {
  closeModal
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function SignUpModal({ closeModal }) {
  const classes = useStyles();
  return (
    <Fragment>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={true}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={true}>
            <div className={classes.paper}>
              <SignUpForm closeModal={closeModal} />
            </div>
          </Fade>
        </Modal>
      </div>
    </Fragment>
  );
}
export default connect(null, actions)(SignUpModal);
