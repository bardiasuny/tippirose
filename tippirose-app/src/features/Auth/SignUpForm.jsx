import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { isRequired, combineValidators } from "revalidate";

import { signUp } from "./authAction";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

import InputText from "../../components/Forms/InputText";
import Button from "../../components/CustomButtons/Button";

const actions = {
  signUp
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const style = {};

const useStyles = makeStyles(style);

const validate = combineValidators({
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password")
});

function SignUpForm({ closeModal, handleSubmit, signUp, error }) {
  const classes = useStyles();

  return (
    <div>
      <h3 className="p4">SING UP</h3>
      <form onSubmit={handleSubmit(signUp)} className="p4">
        <Field
          name="displayName"
          type="text"
          component={InputText}
          placeholder=" Display Name"
          className="p2"
        />
        <Field
          name="email"
          type="email"
          component={InputText}
          placeholder="Email"
          className="p2"
        />
        <Field
          name="password"
          type="password"
          component={InputText}
          placeholder="Password"
          className="p2"
        />
        <div className="p4">
          {error && (
            <label basic color="red">
              {error}
            </label>
          )}
        </div>
        <Button color="primary" type="submit" className="p4">
          {" "}
          Lets go
        </Button>
      </form>
    </div>
  );
}

export default connect(
  null,
  actions
)(reduxForm({ form: "signUpForm", validate })(SignUpForm));
