import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button";
import AddIcon from "@material-ui/icons/Add";

function AddTemplateButton() {
  return (
    <Fragment>
      <Link to="/">
        ADD/EDIT TEMPLATE{" "}
        <Button justIcon round color="success">
          <AddIcon />
        </Button>
      </Link>
    </Fragment>
  );
}
export default AddTemplateButton;
