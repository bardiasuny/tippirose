import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, Button } from "@material-ui/core";
const style = {};

const useStyles = makeStyles(style);

function SelectProductPaterns({ patterns, handlePattern, productPatterns }) {
  const classes = useStyles();

  const [check, setCheck] = useState(false);

  const getCheckValue = paternName => {
    let chekced;

    console.log({ productPatterns });
    if (productPatterns) {
      const isCheck = productPatterns.indexOf(paternName);

      if (isCheck !== -1) {
        chekced = true;
      } else {
        chekced = false;
      }
    }
    console.log(chekced);

    return chekced;
  };

  return (
    <Fragment>
      <div className="flex_row flex_wrapper ph4">
        {patterns &&
          patterns.map(pattern => (
            <Fragment>
              {productPatterns &&
              productPatterns.some(
                ptrn => ptrn.name === pattern.name
              ) ? null : (
                <div class="">
                  <img
                    style={{ width: "100px", padding: "10px" }}
                    src={pattern.url}
                  />
                  <br />

                  <div className="center_component flex_column">
                    <p>{pattern.name}</p>
                    {}
                    <Button onClick={e => handlePattern(e, pattern)}>
                      Add pattern
                    </Button>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
}
export default SelectProductPaterns;
