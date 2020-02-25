import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  updateState
} from "react";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../../features/async/asyncActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { isRequired, combineValidators } from "revalidate";

import InputTextProduct from "../../../components/Forms/Products/InputTextProduct";
import SelectInputProduct from "../../../components/Forms/Products/SelectInputProduct";
import SelectInputMultiple from "../../../components/Forms/Products/SelectInputMulriple";

import PhotoInput from "../../../features/PhotoInput/PhotoInput";
import PhotoTable from "../../../features/PhotoInput/PhotoTable";

import Dropzone from "react-dropzone";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { Divider, CircularProgress } from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button.js";

import { category, gender, color, size } from "./OrderOptions";

import {
  addProduct,
  getProduct,
  getProductImages,
  deleteImage,
  SetMainImage,
  resetReducer,
  assignProductColor,
  setProductQRCodeInImage,
  getProductPatterns,
  addPatternToProduct,
  assignPatternToImage
} from "./productActions";

import { withRouter } from "react-router-dom";
import TemplateInput from "features/PhotoInput/TemplateInput";
import SelectProductPaterns from "./SelectProductPaterns";

const actions = {
  addProduct,
  getProduct,
  getProductImages,
  deleteImage,
  SetMainImage,
  resetReducer,
  assignProductColor,
  setProductQRCodeInImage,
  getProductPatterns,
  addPatternToProduct,
  assignPatternToImage
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
    patterns: state.product.patterns
  };
};

const validate = combineValidators({});

const style = {
  wrapper: {
    position: "relative"
  },
  buttonProgress: {
    color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

const useStyles = makeStyles(style);

function AddProduct({
  handleSubmit,
  addProduct,
  match,
  getProduct,
  initialValues,
  getProductImages,
  imagesAll,
  deleteImage,
  SetMainImage,
  mainImage,
  resetReducer,
  history,
  dispatch,
  loading,
  assignProductColor,
  setProductQRCodeInImage,
  getProductPatterns,
  patterns,
  addPatternToProduct,
  productPatterns,
  imagesPattern,
  assignPatternToImage
}) {
  const classes = useStyles();
  const [allImages, setImages] = useState([]);

  const handleDelete = async img => {
    await deleteImage(initialValues, img);
    await getProductImages(match.params.id);
  };

  const handleSetMainImage = async img => {
    await SetMainImage(initialValues.id, img, initialValues.category);
    await getProduct(match.params.id);
  };

  const handleSubmitWithPictures = async product => {
    if (product.category) {
      dispatch(asyncActionStart());
      await addProduct(product, allImages, initialValues);
      await getProductImages(match.params.id);
      setImages([]);
      const cat = product.category && product.category.toLowerCase();

      setTimeout(() => {
        history.push(`/admin/products/${cat}`);
        dispatch(asyncActionFinish());
      }, 3000);
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
      await getProduct(match.params.id);
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
      await getProductPatterns();
      if (match.params.id) {
        await getProduct(match.params.id);
      } else {
        await resetReducer("FETCH_PRODUCT", "product");
        await resetReducer("FETCH_PRODUCT_IMAGES", "img");
      }
    };
    getproducteffect();
  }, []);

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
          name="subCategory"
          type="text"
          component={InputTextProduct}
          placeholder="Sub Category"
        />
        <Field
          name="price"
          type="number"
          component={InputTextProduct}
          placeholder="Price"
          width="30%"
          icon="£"
        />
        <Field
          name="discount"
          type="number"
          component={InputTextProduct}
          placeholder="Discount"
          width="30%"
          icon="%"
          max="100"
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
          name="color"
          component={SelectInputMultiple}
          placeholder="Color"
          options={color}
          multiple
        />
        <Field
          name="size"
          component={SelectInputMultiple}
          placeholder="Size"
          options={size}
          multiple
        />
        <Field
          name="care"
          type="text"
          component={InputTextProduct}
          placeholder="Care"
        />
        <Field
          name="history"
          type="text"
          component={InputTextProduct}
          placeholder="History"
          row="4"
          multiline
        />
        <Field
          name="madein"
          type="text"
          component={InputTextProduct}
          placeholder="Made in"
        />
        <Field
          name="gender"
          component={SelectInputProduct}
          options={gender}
          placeholder="Gender"
          value="category"
        />
        <SelectProductPaterns
          patterns={patterns}
          handlePattern={handlePattern}
          productPatterns={productPatterns}
        />

        <div className="p4">
          <PhotoInput setImages={setImages} images={allImages} />
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
            <PhotoTable
              imagesAll={imagesAll}
              handleDelete={handleDelete}
              withButton
              handleSetMainImage={handleSetMainImage}
              initialValues={initialValues}
              width="200px"
              withDropdown={true}
              assignProductColor={assignProductColor}
              handleQRCode={handleQRCode}
              productPatterns={productPatterns}
              handlePatternAssign={handlePatternAssign}
              getProductImages={getProductImages}
              match={match}
            />
          </div>
        )}

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
    reduxForm({ form: "addProduct", validate, enableReinitialize: true })(
      AddProduct
    )
  )
);
