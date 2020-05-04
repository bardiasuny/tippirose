import React, { Fragment } from "react";

import { Field, reduxForm } from "redux-form";
// @material-ui/core components

import InputTextProduct from "components/Forms/Products/InputTextProduct";
import Button from "components/CustomButtons/Button";
import { connect } from "react-redux";
import { activateProduct } from "./tippiVipActions";
import { Container } from "@material-ui/core";
import { useState } from "react";

const actions = {
  activateProduct,
};

function TippiProductActivation({
  handleSubmit,
  product,
  activateProduct,
  profile,
}) {
  const [error, setError] = useState(null);

  const handleActivation = async (userData) => {
    const activationRes = await activateProduct(product, userData, profile);

    if (activationRes) {
      setError(activationRes);
    }
  };

  return (
    <Fragment>
      <Container>
        <form
          className="form_Wrapper"
          onSubmit={handleSubmit(handleActivation)}
        >
          <Field
            name="secretKey"
            component={InputTextProduct}
            placeholder="Secret Key"
            value="category"
          />
          <div className="center_component">
            <p>{error}</p>
          </div>

          <div className="center_component">
            <Button color="success" type="submit">
              Activate
            </Button>
          </div>
        </form>
      </Container>
    </Fragment>
  );
}
export default connect(
  null,
  actions
)(
  reduxForm({ form: "activation", enableReinitialize: true })(
    TippiProductActivation
  )
);
