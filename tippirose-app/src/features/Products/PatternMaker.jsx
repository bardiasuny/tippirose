import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import { ReactComponent as Template } from "./test-pattern.svg";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { withFirestore } from "react-redux-firebase";
//import SvgInline from "./SvgInline";
import svgToPng from "./util";

import uuid from "uuid";

//ACTIONS

import { orderProductMakeVip } from "../User/userAcrions";

import saveSvgAsPng from "save-svg-as-png";

const actions = { orderProductMakeVip };

const mapState = state => ({
  auth: state.firebase.auth,
  patterns: state.firestore.ordered.patterns
});

const style = {};

const useStyles = makeStyles(style);

function PatternMaker({
  auth,
  product,
  color,
  size,
  selectedPattern,
  firestore,
  patterns,
  setOpenPatternMaker,
  orderProductMakeVip
}) {
  const classes = useStyles();
  const [uniqId, setUniqId] = useState("");
  const [uniqUrl, setUniqUrl] = useState("");
  useEffect(() => {
    const getTemplate = async () => {
      await firestore.get({
        collection: "patterns",
        doc: selectedPattern
      });
    };
    const uniqueId = `${product.id}-${auth.uid}-${uuid()}`;
    setUniqId(uniqueId);
    const qrUrl = `http://192.168.1.64:3000/vip/${auth.uid}/${uniqueId}`;
    setUniqUrl(qrUrl);

    getTemplate();
    dosomething(uniqueId, qrUrl);
  }, []);
  console.log(uniqId);

  const dosomething = (uniqueId, qrUrl) => {
    setTimeout(async () => {
      let pattern = document.getElementById("pattern");

      let qrcode = document.getElementById("qrcode");

      let pattern2 = document.getElementById("pattern2");
      let qrcode2 = document.getElementById("qrcode2");

      let image = document.querySelector("image");
      console.log(image);
      let bgImageUrl = patterns && patterns[0].img;
      console.log(patterns && patterns[0].img);

      while (pattern.firstChild) {
        pattern.removeChild(pattern.firstChild);
        pattern2.removeChild(pattern2.firstChild);
      }
      pattern.appendChild(qrcode);
      pattern2.appendChild(qrcode2);
      // await document
      //   .querySelector("image")
      //   .setAttributeNS(
      //     "http://www.w3.org/1999/xlink",
      //     "xlink:href",
      //     bgImageUrl
      //   );
      console.log(uniqId);
      let svg = document.getElementById("Layer_1").outerHTML;

      const uniqID = uniqId && uniqId;
      const uniqURL = uniqUrl && uniqUrl;
      svgToPng(svg)
        .then(async data => {
          await orderProductMakeVip(
            data,
            product,
            color,
            size,
            selectedPattern,
            uniqueId,
            qrUrl
          );

          var a = document.createElement("a");
          a.download = "template.png";
          a.href = data;
          a.click();
        })
        .catch(err => console.error(err));
      setOpenPatternMaker(false);
    }, 3000);
  };

  return (
    <Fragment>
      <Backdrop open={true}>
        <div className="add_template_paper ">
          <h1>Proccessing your Order ...</h1>
          <div className="hidden">
            <QRCode
              size={1}
              id="qrcode"
              bgColor={"#0c0d0e00"}
              fgColor={"#302f57"}
              renderAs={"svg"}
              value={uniqUrl && uniqUrl}
            />
            <QRCode
              size={1}
              id="qrcode2"
              bgColor={"#0c0d0e00"}
              fgColor={"#f24f48"}
              renderAs={"svg"}
              value={uniqUrl && uniqUrl}
            />
          </div>

          {/* <Template /> */}
          <div className="svg_manage">
            <SvgInline
              id="my-template"
              fill="white"
              url={patterns && patterns[0].url}
              // onClick={pattern && pattern[0] && dosomething()}
            />
          </div>
        </div>
      </Backdrop>
    </Fragment>
  );
}
export default connect(mapState, actions)(withFirestore(PatternMaker));

const SvgInline = props => {
  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    fetch(props.url, { mode: "cors" })
      .then(res => res.text())
      .then(setSvg)
      .catch(setIsErrored)
      .then(() => setIsLoaded(true));
  }, [props.url]);

  return (
    <div
      className={`svgInline svgInline--${isLoaded ? "loaded" : "loading"} ${
        isErrored ? "svgInline--errored" : ""
      }`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
