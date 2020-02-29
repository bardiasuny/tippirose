import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button";
import AddIcon from "@material-ui/icons/Add";

import { openModal } from "../../../features/Modals/modalActions";
import { connect } from "react-redux";

const actions = {
  openModal
};

function AddProfileButton({ openModal }) {
  const handleAddNewProfile = () => {};

  return (
    <Fragment>
      <div onClick={() => openModal("AddProfileModal")}>
        ADD/EDIT PROFILES{" "}
        <Button justIcon round color="success">
          <AddIcon />
        </Button>
      </div>
    </Fragment>
  );
}
export default connect(null, actions)(AddProfileButton);
