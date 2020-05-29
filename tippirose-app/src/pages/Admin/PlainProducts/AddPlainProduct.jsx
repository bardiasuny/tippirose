import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  updateState,
} from "react";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../../features/async/asyncActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { isRequired, combineValidators } from "revalidate";

import InputTextProduct from "../../../components/Forms/Products/InputTextProduct";
import SelectInputProduct from "../../../components/Forms/Products/SelectInputProduct";
import SelectInputMultiple from "../../../components/Forms/Products/SelectInputMulriple";

import PhotoInput from "../../../features/PhotoInput/PhotoInput";
import PhotoTablePlainProduct from "../../../features/PhotoInput/PhotoTablePlainProduct";

import Dropzone from "react-dropzone";

// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { Divider, CircularProgress } from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button.js";

import {
  category,
  gender,
  color,
  size,
  type,
  sizeMetric,
} from "./data/OrderOptions";

import {
  getProductImages,
  SetMainImage,
  resetReducer,
  setProductQRCodeInImage,
  getProductPatterns,
  addPatternToProduct,
  assignPatternToImage,
} from "../Product/productActions";

import {
  addPlainProduct,
  getPlainProduct,
  deletePlainImage,
  assignPlainProductColor,
  getPlainProductImagesWithCat,
} from "./plainProductActions";

import { withRouter } from "react-router-dom";
import TemplateInput from "features/PhotoInput/TemplateInput";
import SelectProductPaterns from "../Product/SelectProductPaterns";
import Image from "material-ui-image";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
  },
}))(TableRow);

const actions = {
  addPlainProduct,
  getPlainProduct,
  getProductImages,
  deletePlainImage,
  SetMainImage,
  resetReducer,
  assignPlainProductColor,
  setProductQRCodeInImage,
  getProductPatterns,
  addPatternToProduct,
  assignPatternToImage,
  getPlainProductImagesWithCat,
};

const mapState = (state, ownProps) => {
  return {
    initialValues: state.product.product[0],
    productPatterns:
      state.product.product[0] && state.product.product[0].patterns,
    mainImage:
      state.product.product &&
      state.product.product[0] &&
      state.product.product[0].mainImageUrl,
    imagesAll: state.product.img,
    loading: state.async.loading,
    patterns: state.product.patterns,
  };
};

const validate = combineValidators({});

const style = {
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
};

const useStyles = makeStyles(style);

function AddPlainProduct({
  handleSubmit,
  addPlainProduct,
  match,
  getPlainProduct,
  initialValues,
  getProductImages,
  imagesAll,
  deletePlainImage,
  SetMainImage,
  mainImage,
  resetReducer,
  history,
  dispatch,
  loading,
  assignPlainProductColor,
  setProductQRCodeInImage,
  getProductPatterns,
  patterns,
  addPatternToProduct,
  productPatterns,
  imagesPattern,
  assignPatternToImage,
  getPlainProductImagesWithCat,
}) {
  const classes = useStyles();
  const [newImages, setNewImages] = useState(null);
  const [allImages, setImages] = useState(imagesAll);
  const [sizeMetircState, setSizeMetircState] = useState("");
  const [sizeArray, setSizeArray] = useState([]);
  const handleDelete = async (img) => {
    await deletePlainImage(initialValues, img);
    await getProductImages(match.params.id);
  };

  const handleSetMainImage = async (img) => {
    await SetMainImage(initialValues.id, img, initialValues.category);
    await getPlainProduct(match.params.id);
  };

  const handleSubmitWithPictures = async (product) => {
    if (product.category) {
      try {
        dispatch(asyncActionStart());
        await addPlainProduct(product, allImages, newImages, initialValues);
        console.log(allImages);
        await getProductImages(match.params.id);
        setImages([]);
        dispatch(asyncActionFinish());
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleaddPlainProduct = async (product) => {
    if (product.category) {
      dispatch(asyncActionStart());
      await addPlainProduct(product, allImages, initialValues);
      console.log(allImages);
      await getProductImages(match.params.id);
      setImages([]);
    }
  };

  const handleQRCode = async (e, imgId) => {
    const name = e.target.name;
    const value = e.target.value;
    await setProductQRCodeInImage(name, value, imgId, initialValues);
    await getProductImages(match.params.id);
  };

  const handlePattern = async (e, pattern) => {
    if (initialValues) {
      await addPatternToProduct(pattern, initialValues, productPatterns);
      await getPlainProduct(match.params.id);
    }
  };

  const handlePatternAssign = async (pattern, img) => {
    console.log(pattern);
    await assignPatternToImage(initialValues, pattern, img);
    await getProductImages(match.params.id);
  };

  useEffect(() => {
    console.log("effect fired");
    const getproducteffect = async () => {
      console.log("match.params.id", match);
      if (match.params.id) {
        await getPlainProduct(match.params.id);
        await getProductImages(match.params.id);
      } else {
        await resetReducer("FETCH_PRODUCT", "product");
        await resetReducer("FETCH_PRODUCT_IMAGES", "img");
      }
    };
    getproducteffect();
  }, []);

  useEffect(() => {}, [allImages]);

  return (
    <Fragment>
      <Backdrop open={loading} style={{ zIndex: 10 }} />
      <h1>Add Product</h1>

      <Divider />
      <br />
      <form
        className="form_Wrapper"
        onSubmit={handleSubmit(handleSubmitWithPictures)}
      >
        <Field
          name="manufacturerBrand"
          type="text"
          component={InputTextProduct}
          placeholder="Manufacturer Brand"
        />
        <Field
          name="productName"
          type="text"
          component={InputTextProduct}
          placeholder="Product Name"
        />
        <Field
          name="category"
          component={SelectInputProduct}
          options={category}
          placeholder="Product Category"
          value="category"
          multiple={false}
          disabled={initialValues ? true : false}
        />
        <Field
          name="type"
          component={SelectInputProduct}
          options={type}
          placeholder="Product Tyoe"
          value="type"
          multiple={false}
        />
        <Field
          name="description"
          type="text"
          component={InputTextProduct}
          placeholder="Description"
          row="4"
          multiline
        />
        <Field
          name="Size Metric"
          component={SelectInputProduct}
          options={sizeMetric}
          placeholder="Size Metric"
          onChange={(e) => setSizeMetircState(e.target.value.toUpperCase())}
        />
        <Field
          name="size"
          component={SelectInputMultiple}
          placeholder="Size"
          options={size[sizeMetircState] || []}
          multiple
          onChange={(sizeArray) => setSizeArray(sizeArray)}
        />
        <TableContainer component={Paper} className={classes.tableWrapper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>sizes</StyledTableCell>
                {sizeArray.map((size) => (
                  <StyledTableCell>{size}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {category[0].sizeGuideOptions.map((guide) => (
                <StyledTableRow key={guide}>
                  <StyledTableCell>{guide}</StyledTableCell>

                  {sizeArray.map((size) => (
                    <StyledTableCell>
                      <Field
                        name={`${size}_${guide}`}
                        type="text"
                        component={InputTextProduct}
                        placeholder={size}
                      />
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Field
          name="price"
          type="number"
          component={InputTextProduct}
          placeholder="Price"
          width="30%"
          icon="£"
        />
        <Field
          name="care"
          type="text"
          component={InputTextProduct}
          placeholder="Care"
        />
        <Field
          name="gender"
          component={SelectInputProduct}
          options={gender}
          placeholder="Gender"
          value="category"
        />

        <div className="p4">
          <PhotoInput setImages={setNewImages} images={newImages} />
        </div>
        {/* MAINIMAGE */}

        {mainImage && (
          <div>
            <div className="flex_column p3">
              <h4>Main Image</h4>
              <img
                style={{ width: 200, height: "auto" }}
                src={mainImage}
                alt="main product"
              />
            </div>
          </div>
        )}

        {initialValues && (
          <div className=" p3">
            <PhotoTablePlainProduct
              imagesAll={imagesAll}
              handleDelete={handleDelete}
              withButton
              handleSetMainImage={handleSetMainImage}
              initialValues={initialValues}
              width="200px"
              withDropdown={true}
              assignPlainProductColor={assignPlainProductColor}
              handleQRCode={handleQRCode}
              productPatterns={productPatterns}
              handlePatternAssign={handlePatternAssign}
              getProductImages={getProductImages}
              match={match}
              setImages={setImages}
            />
          </div>
        )}

        <div className="center_component">
          <div className={classes.wrapper}>
            <Button type="submit">add images</Button>
          </div>
        </div>

        <div className="center_component">
          <div className={classes.wrapper}>
            <Button color="success" type="submit" disabled={loading}>
              Add product
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Button color="default">Save</Button>
          {initialValues && <Button color="danger">Delete</Button>}
        </div>
      </form>
    </Fragment>
  );
}
export default connect(
  mapState,
  actions
)(
  withRouter(
    reduxForm({ form: "addPlainProduct", validate, enableReinitialize: true })(
      AddPlainProduct
    )
  )
);
