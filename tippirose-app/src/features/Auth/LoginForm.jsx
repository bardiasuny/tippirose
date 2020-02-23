import React from "react";

import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { isRequired, combineValidators } from "revalidate";

import { login } from "./authAction";

import InputText from "../../components/Forms/InputText";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Assignment from "@material-ui/icons/Assignment";
import Mail from "@material-ui/icons/Mail";
import Face from "@material-ui/icons/Face";
// core components
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";

import style from "../../assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";

const actions = {
  login
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password")
});

const useStyles = makeStyles(style);

function LoginForm({ closeModal, login, handleSubmit }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalLogin
        }}
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-labelledby="login-modal-slide-title"
        aria-describedby="login-modal-slide-description"
      >
        <Card plain className={classes.modalLoginCard}>
          <DialogTitle
            id="login-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <CardHeader
              plain
              color="primary"
              className={`${classes.textCenter} ${classes.cardLoginHeader}`}
            >
              <Button
                simple
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                onClick={closeModal}
              >
                {" "}
                <Close className={classes.modalClose} />
              </Button>
              <h5 className={classes.cardTitleWhite}>Log in</h5>
              <div className={classes.socialLine}>
                <Button justIcon link className={classes.socialLineButton}>
                  <i className="fab fa-facebook-square" />
                </Button>
                <Button justIcon link className={classes.socialLineButton}>
                  <i className="fab fa-twitter" />
                </Button>
                <Button justIcon link className={classes.socialLineButton}>
                  <i className="fab fa-google-plus-g" />
                </Button>
              </div>
            </CardHeader>
          </DialogTitle>
          <DialogContent
            id="login-modal-slide-description"
            className={classes.modalBody}
          >
            <form onSubmit={handleSubmit(login)}>
              <p className={`${classes.description} ${classes.textCenter}`}>
                Or Be Classical
              </p>
              <CardBody className={classes.cardLoginBody}>
                <Field
                  name="email"
                  type="email"
                  component={InputText}
                  placeholder="Email"
                />
                <Field
                  name="password"
                  type="password"
                  component={InputText}
                  placeholder="password"
                />
              </CardBody>
              <Button color="primary" simple size="lg" type="submit">
                LOG IN
              </Button>
            </form>
          </DialogContent>
        </Card>
      </Dialog>
    </div>
  );
}

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm", validate })(LoginForm));
