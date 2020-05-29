import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import QRCode from "qrcode.react";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Button from "../../components/CustomButtons/Button.js";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  TableCell,
  Checkbox,
} from "@material-ui/core";
import SelectInputProduct from "components/Forms/Products/SelectInputProduct.jsx";

const style = {};

const useStyles = makeStyles(style);

function PhotoTable({
  imagesAll,
  setImages,
  initialValues,
  handleDelete,
  handleSetMainImage,
  width,
  withButton,
  buttonLeft,
  buttonRight,
  withDropdown,
  assignPlainProductColor,
  handleQRCode,
  productPatterns,
  assignPatternToImage,
  handlePatternAssign,
  imagesPattern,
  getProductImages,
  match,
}) {
  const classes = useStyles();

  console.log(imagesAll);
  const handleImagesChange = (e, i) => {
    //console.log("item", item);
    const name = e.target.name;

    const images = [...imagesAll];

    const image = images[i];

    if (name === "light" || name === "dark") {
      image[name] = !image[name];
      images[i] = image;
      setImages(images);
    } else {
      console.log(image);
      image[e.target.name] = e.target.value;
      images[i] = image;
      setImages(images);
    }
  };

  // const handleProductColorAssign = async (img) => {

  //   await assignPlainProductColor(initialValues, tshirtInfo, img);
  // };

  useEffect(() => {
    const getimg = async () => {
      await getProductImages(match.params.id);
    };
    getimg();
  }, [getProductImages, match.params.id]);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 15,
      textAlign: "center",
    },
    body: {},
  }))(TableCell);

  return (
    <Fragment>
      {imagesAll && (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Color</StyledTableCell>
                <StyledTableCell>Template</StyledTableCell>
                <StyledTableCell>QR Code 1</StyledTableCell>
                <StyledTableCell>QR Code 2</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            {imagesAll.map((img, i) => (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <img
                      style={{ width: width, height: "auto" }}
                      src={img.url}
                    />
                  </TableCell>

                  {/* GET PRODUCT COLOR */}
                  <TableCell>
                    <InputLabel
                      //ref={inputLabel}
                      htmlFor="outlined-age-native-simple"
                    >
                      Color Name
                    </InputLabel>
                    <FormControl
                      variant="outlined"
                      style={{ width: "100%", marginTop: 10 }}
                    >
                      <TextField
                        value={img.color && img.color}
                        name="color"
                        variant="outlined"
                        onChange={
                          (e) => handleImagesChange(e, i)
                          // handleProductColorAssign(e.target.value, img)
                        }
                      />
                    </FormControl>
                    <br />
                    <br />

                    <InputLabel
                      //ref={inputLabel}
                      htmlFor="outlined-age-native-simple"
                    >
                      Color Code
                    </InputLabel>
                    <FormControl
                      variant="outlined"
                      style={{ width: "100%", marginTop: 10 }}
                    >
                      <TextField
                        value={img.colorCode && img.colorCode}
                        name="colorCode"
                        variant="outlined"
                        onChange={
                          (e) => handleImagesChange(e, i)
                          // handleProductColorAssign(e.target.value, img)
                        }
                      />
                    </FormControl>
                  </TableCell>

                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <InputLabel>Accept Light colors</InputLabel>
                      <FormControl variant="outlined">
                        <Checkbox
                          checked={img.light}
                          name="light"
                          onChange={(e) => handleImagesChange(e, i)}
                        />
                      </FormControl>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <InputLabel>Accept dark colors</InputLabel>
                      <FormControl variant="outlined">
                        <Checkbox
                          checked={img.dark}
                          name="dark"
                          onChange={(e) => handleImagesChange(e, i)}
                        />
                      </FormControl>
                    </div>
                  </TableCell>
                  <TableCell style={{ maxWidth: 100 }}>
                    {withButton && (
                      <div>
                        {/* <Button
                          color="success"
                          size="sm"
                          onClick={() => handleImagesChange(img)}
                        >
                          save
                        </Button> */}
                      </div>
                    )}
                  </TableCell>
                  <TableCell style={{ maxWidth: 100 }}>
                    {withButton && (
                      <div>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(img)}
                        >
                          {buttonLeft}
                        </Button>
                        {initialValues.mainImageName !== img.name && (
                          <Button
                            color="success"
                            size="sm"
                            onClick={() => handleSetMainImage(img)}
                          >
                            {buttonRight}
                          </Button>
                        )}
                      </div>
                    )}
                  </TableCell>
                  {/* PATTEN */}
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
}
export default PhotoTable;

PhotoTable.defaultProps = {
  width: 100,
  imagesAll: [],
  withButton: false,
  buttonLeft: "x",
  buttonRight: "MAIN",
  initialValues: {},
};
