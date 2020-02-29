import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import { closeModal } from "./modalActions";
import { createNewProfile } from "../../pages/TippiVipAcount/vipAccountActions";

import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { TextField } from "@material-ui/core";

import Button from "components/CustomButtons/Button";
import { withRouter } from "react-router-dom";

const actions = {
  closeModal,
  createNewProfile
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

function AddProfileModal({ closeModal, createNewProfile, history }) {
  const classes = useStyles();

  const [name, setName] = useState("");

  const handleCreateNewPRofile = async e => {
    e.preventDefault();
    await createNewProfile(name);

    await history.push(`/account/vip/profiles/manage/${name}`);
    closeModal();
  };

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
              <div className="center_component">
                <p>Profile Name</p>
              </div>
              <form className="flex_column" onSubmit={handleCreateNewPRofile}>
                <TextField
                  placeholder="Profile Name"
                  name="name"
                  variant="outlined"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Button type="submit" color="primary">
                  {" "}
                  Create
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </Fragment>
  );
}
export default connect(null, actions)(withRouter(AddProfileModal));
