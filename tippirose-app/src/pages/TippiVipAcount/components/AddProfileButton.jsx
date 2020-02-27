import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button";
import AddIcon from "@material-ui/icons/Add";

function AddProfileButton() {
  return (
    <Fragment>
      <Link to="/account/vip/profiles">
        ADD/EDIT PROFILES{" "}
        <Button justIcon round color="success">
          <AddIcon />
        </Button>
      </Link>
    </Fragment>
  );
}
export default AddProfileButton;
