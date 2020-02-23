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
  Checkbox
} from "@material-ui/core";
import SelectInputProduct from "components/Forms/Products/SelectInputProduct.jsx";

const style = {};

const useStyles = makeStyles(style);

function PhotoTable({
  imagesAll,
  initialValues,
  handleDelete,
  handleSetMainImage,
  width,
  withButton,
  buttonLeft,
  buttonRight,
  withDropdown,
  assignProductColor,
  handleQRCode,
  productPatterns,
  assignPatternToImage,
  handlePatternAssign,
  imagesPattern,
  getProductImages,
  match
}) {
  const classes = useStyles();
  const [imgStateAll, setStateImageAll] = useState();

  const handleProductColorAssign = async (color, img) => {
    await assignProductColor(initialValues, color, img);
  };

  useEffect(() => {
    const getimg = async () => {
      await getProductImages(match.params.id);
    };
    getimg();
    setStateImageAll(imagesAll);
  });

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 15,
      textAlign: "center"
    },
    body: {}
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
            {imagesAll.map(img => (
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
                    <FormControl
                      variant="outlined"
                      style={{ width: "100%", marginTop: 10 }}
                    >
                      <InputLabel
                        //ref={inputLabel}
                        htmlFor="outlined-age-native-simple"
                      >
                        Color
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        for="outlined-error-helper-text"
                        value={img.color && img.color}
                        onChange={e =>
                          handleProductColorAssign(e.target.value, img)
                        }
                        labelWidth={100}
                        inputProps={{
                          name: "color",
                          id: "color_selector"
                        }}
                        className="select_options"
                      >
                        {initialValues &&
                          initialValues.color &&
                          initialValues.color.map(color => (
                            <MenuItem value={color} key={color}>
                              {color}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell style={{ maxWidth: 100 }}>
                    <div className="center_component">
                      <QRCode
                        size={100}
                        id="qrcode1"
                        fgColor={img.qrCode1Fg}
                        bgColor="#00000000"
                        renderAs={"svg"}
                        value={"https://tippirose.com"}
                      />
                    </div>
                    <FormControl
                      variant="outlined"
                      style={{ width: "100%", marginTop: 10 }}
                    >
                      <TextField
                        value={img.qrCode1Fg}
                        name="qrCode1Fg"
                        variant="outlined"
                        onChange={e => handleQRCode(e, img.id)}
                      />
                      <br />
                      <TextField
                        name="qrCode1Bg"
                        variant="outlined"
                        onChange={e => handleQRCode(e, img.id)}
                      />
                      <br />
                    </FormControl>
                  </TableCell>
                  <TableCell style={{ maxWidth: 100 }}>
                    <div className="center_component">
                      <QRCode
                        size={100}
                        id="qrcode2"
                        fgColor={img.qrCode2Fg}
                        bgColor={"#00000000"}
                        renderAs={"svg"}
                        value={"https://tippirose.com"}
                      />
                    </div>
                    <FormControl style={{ width: "100%", marginTop: 10 }}>
                      <TextField
                        value={img.qrCode2Fg}
                        name="qrCode2Fg"
                        variant="outlined"
                        onChange={e => handleQRCode(e, img.id)}
                      />
                      <br />
                      <TextField
                        name="qrCode2Bg"
                        variant="outlined"
                        onChange={e => handleQRCode(e, img.id)}
                      />
                      <br />
                    </FormControl>
                    {/* <Checkbox
                      checked={isQrCode2[img.id]}
                      onChange={e =>
                        setIsQrCode2({
                          ...isQrCode2,
                          [img.id]: e.target.checked
                        })
                      }
                      defaultChecked
                      value="secondary"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    /> */}
                  </TableCell>
                  <TableCell>
                    <FormControl
                      variant="outlined"
                      style={{ width: "100%", marginTop: 10 }}
                    >
                      <InputLabel
                        //ref={inputLabel}
                        htmlFor="pattern_selector"
                      >
                        Pattern
                      </InputLabel>
                      <Select
                        for="pattern_selector"
                        value={img.pattern && img.pattern}
                        onChange={e => handlePatternAssign(e.target.value, img)}
                        labelWidth={100}
                        inputProps={{
                          name: "pattern",
                          id: "pattern_selector"
                        }}
                        className="select_options"
                      >
                        {initialValues &&
                          initialValues.patterns &&
                          initialValues.patterns.map(pattern => (
                            <MenuItem value={pattern.name} key={pattern.name}>
                              <div className="flex_row">
                                <img
                                  style={{ width: 30, margin: "5px 10x" }}
                                  src={pattern.url}
                                  alt="pattern"
                                />
                                {pattern.name}
                              </div>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
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
  initialValues: {}
};
