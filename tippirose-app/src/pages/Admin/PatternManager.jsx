import firebase from "../../app/config/firebase";

import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TemplateInput from "features/PhotoInput/TemplateInput";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "components/CustomButtons/Button";

// @material-ui/icon components
import AddIcon from "@material-ui/icons/Add";
import { Backdrop, TextField, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import {
  addPatternTemplate,
  getProductPatterns
} from "../Admin/Product/productActions";
import { withFirestore } from "react-redux-firebase";
import PhotoOrganizer from "features/PhotoInput/PhotoOrganizer";
import TemplateInputSampleImage from "features/PhotoInput/TemplateInputSampleImage";
import TemplateOrganizer from "features/PhotoInput/TemplateOrganizer";

const actions = {
  addPatternTemplate,
  getProductPatterns
};

const mapState = state => ({
  patterns: state.product.patterns
});

const style = {};

const useStyles = makeStyles(style);

function PatternManager({ addPatternTemplate, getProductPatterns, patterns }) {
  const classes = useStyles();
  const [template, setTemplate] = useState([]);
  const [templateSampleImage, setTemplateSampleImage] = useState([]);
  const [openAddBox, setOpenAddBox] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const getTemplate = async () => {
      getProductPatterns();
    };
    getTemplate();
  }, []);

  const handleDelete = template => {
     
  };

  const onPetternSubmit = async () => {
    const templatePureName = templateName.toLowerCase();
    if (template && template.length === 0) {
      setError("there is not pattern in this file");
    } else {
      if (!templateName) {
        setError("Name fields is empty");
      } else {
        if (available) {
          setError("Name Already exist");
          setAvailable(true);
        } else {
          await addPatternTemplate(
            template,
            templateSampleImage,
            templatePureName
          );
          await getProductPatterns();
          setError("");
          setTemplateName("");
          setTemplate([]);
          setOpenAddBox(false);
        }
      }
    }
  };
  console.log(available);
  const checkNameAvailable = async name => {
    const pureName = name.toLowerCase();
    if (name) {
      const patternQuery = await firebase
        .firestore()
        .collection("patterns")
        .doc(pureName)
        .get();

      console.log(patternQuery);
      if (patternQuery.exists) {
        setAvailable(patternQuery.exists);
      }
      setAvailable(patternQuery.exists);
    }
  };

  return (
    <Fragment>
      <div className="center_component p4 ">
        <h1>Pattern Manager</h1>
      </div>
      <div className="right_align">
        <p className="pv2">Add New Pattern</p>
        <Button
          onClick={() => setOpenAddBox(true)}
          justIcon
          round
          color="success"
        >
          <AddIcon style={{ color: "#FFFFFF" }} />
        </Button>
      </div>
      <div className=" p3">
        <TemplateOrganizer
          templates={patterns}
          handleDelete={handleDelete}
          withButton
          //handleSetMainImage={handleSetMainImage}
          //initialValues={initialValues}
        />
      </div>
      {openAddBox && (
        <Backdrop open={openAddBox} style={{ zIndex: 10 }}>
          <div className="p4 add_template_modal">
            <div className="p4 add_template_paper">
              <h3>Add Pattern Templates Here</h3>
              <br />
              <div>
                <TextField
                  error={available ? true : false}
                  id="pattern_name"
                  label="Pattern Name"
                  onChange={e => {
                    checkNameAvailable(e.target.value);
                    setTemplateName(e.target.value);
                  }}
                  value={templateName}
                  helperText={available ? "This Name Already Exists." : ""}
                />
              </div>

              <br />
              <div className="flex_row ">
                <TemplateInput setTemplate={setTemplate} template={template} />
                <TemplateInputSampleImage
                  setTemplateSampleImage={setTemplateSampleImage}
                  templateSampleImage={templateSampleImage}
                />
              </div>

              <br />
              {error && <MuiAlert severity="error">{error}</MuiAlert>}
              <div class="flex_row">
                <Button onClick={() => onPetternSubmit()} color="success">
                  Submit
                </Button>
                <Button onClick={() => setOpenAddBox(false)} color="danger">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Backdrop>
      )}
    </Fragment>
  );
}
export default connect(mapState, actions)(PatternManager);
